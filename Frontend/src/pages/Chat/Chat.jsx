import { useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { deleteChat, getChatHistory } from "../../services/chatService";
import { ChatContext } from "../../context/ChatContext";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
};

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [error, setError] = useState("");
  const { markResponseUnread } = useContext(ChatContext);
  const storedUser = localStorage.getItem("user");
  let userName = "there";

  if (storedUser) {
    try {
      userName = JSON.parse(storedUser).name || userName;
    } catch {
      userName = "there";
    }
  }

  useEffect(() => {
    let isMounted = true;

    getChatHistory()
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const history = response.data.chats ?? [];
        setChats(history);
        setActiveChatId(history[0]?._id ?? null);
      })
      .catch((historyError) => {
        if (isMounted) {
          setError(
            historyError?.response?.data?.message ||
              "Unable to load chat history."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingHistory(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeChat = chats.find((chat) => chat._id === activeChatId);
  const messages = activeChat?.messages ?? [];

  const handleSend = async (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setPendingQuestion(trimmedMessage);
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/chat/ask", { message: trimmedMessage });
      const newChat = response.data.chat;

      if (!response.data.reply || !newChat) {
        throw new Error("The AI assistant returned no reply.");
      }

      setChats((currentChats) => [
        newChat,
        ...currentChats.filter((chat) => chat._id !== newChat._id),
      ]);
      setActiveChatId(newChat._id);
      setPendingQuestion("");
      markResponseUnread();
    } catch (chatError) {
      setError(
        chatError?.response?.data?.message ||
          "Unable to get a response from the AI assistant."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);
      setChats((currentChats) => {
        const remainingChats = currentChats.filter((chat) => chat._id !== chatId);

        if (activeChatId === chatId) {
          setActiveChatId(remainingChats[0]?._id ?? null);
        }

        return remainingChats;
      });
    } catch (deleteError) {
      setError(
        deleteError?.response?.data?.message ||
          "Unable to delete this conversation."
      );
    }
  };

  return (
    <div className="chat-shell bg-white rounded-2xl shadow-sm h-[80vh] flex overflow-hidden">
      <style>{`
        .chat-shell {
          border: 1px solid #ECEAE3;
        }
        .chat-title {
          background: linear-gradient(90deg, #4F46E5, #9333EA);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .chat-window {
          background: #FAFAF9;
          border: 1px solid #ECEAE3;
          scrollbar-width: thin;
          scrollbar-color: #D6D3C9 transparent;
        }
        .chat-window::-webkit-scrollbar {
          width: 6px;
        }
        .chat-window::-webkit-scrollbar-thumb {
          background: #D6D3C9;
          border-radius: 999px;
        }
        .chat-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 0.5rem;
          color: #9a988f;
        }
        .chat-empty-icon {
          font-size: 1.8rem;
          opacity: 0.7;
        }
        .chat-bubble {
          animation: bubbleIn 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }
        .chat-bubble:hover {
          transform: translateY(-1px);
        }
        .chat-bubble.user {
          background: linear-gradient(135deg, #4F46E5, #6366F1);
          box-shadow: 0 6px 16px -8px rgba(79, 70, 229, 0.55);
        }
        .chat-bubble.assistant {
          background: #ffffff;
          border: 1px solid #ECEAE3;
          box-shadow: 0 1px 3px rgba(20, 20, 20, 0.04);
        }
        .chat-bubble.assistant:hover {
          box-shadow: 0 8px 20px -12px rgba(20, 20, 20, 0.15);
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .typing-dots {
          display: inline-flex;
          gap: 4px;
          align-items: center;
        }
        .typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #9a988f;
          animation: typingBounce 1.1s ease-in-out infinite;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .chat-error {
          animation: fadeSlideIn 300ms ease forwards;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .chat-textarea {
          transition: border-color 220ms ease, box-shadow 220ms ease;
        }
        .chat-textarea:focus {
          outline: none;
          border-color: #6366F1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .chat-send-btn {
          background: linear-gradient(135deg, #4F46E5, #7C3AED);
          background-size: 160% auto;
          transition: background-position 320ms ease, transform 220ms ease, box-shadow 220ms ease;
          box-shadow: 0 6px 16px -8px rgba(79, 70, 229, 0.5);
        }
        .chat-send-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px -8px rgba(79, 70, 229, 0.6);
        }
        .chat-send-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.97);
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-bubble, .chat-error, .typing-dots span {
            animation: none !important;
          }
        }
      `}</style>

      <aside className="chat-history-sidebar hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-3 md:flex">
        <button
          type="button"
          onClick={() => {
            setActiveChatId(null);
            setMessage("");
            setPendingQuestion("");
          }}
          className="mb-3 rounded-lg bg-slate-900 px-3 py-2 text-left text-sm font-medium text-white hover:bg-slate-700"
        >
          + New chat
        </button>

        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          History
        </p>
        <div className="space-y-1 overflow-y-auto">
          {chats.length === 0 ? (
            <p className="px-2 text-sm text-slate-500">No conversations yet.</p>
          ) : chats.map((chat) => (
            <div
              key={chat._id}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm ${
                chat._id === activeChatId
                  ? "bg-white font-medium text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveChatId(chat._id)}
                className="min-w-0 flex-1 truncate py-1 text-left"
              >
                {chat.title || "New conversation"}
              </button>
              <button
                type="button"
                onClick={() => handleDeleteChat(chat._id)}
                className="shrink-0 rounded px-2 py-1 text-xs text-slate-400 hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${chat.title || "conversation"}`}
                title="Delete conversation"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col p-6">
        <h1 className="chat-title text-3xl font-bold mb-4">AI Chat</h1>

      <div className="chat-window flex-1 rounded-xl p-4 overflow-y-auto space-y-3">
        {isLoadingHistory ? (
          <div className="chat-empty">
            <p>Loading chat history...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="chat-empty">
            <span className="chat-empty-icon">💬</span>
            <p className="text-xl font-semibold text-slate-700">
              {getGreeting()}, {userName}
            </p>
            <p>Ask a question to start the chat.</p>
          </div>
        ) : (
          messages.map((item, index) => (
            <div
              key={`${item.role}-${index}`}
              className={`chat-bubble ${item.role} max-w-[85%] rounded-xl p-3 ${
                item.role === "user"
                  ? "ml-auto text-white"
                  : "mr-auto text-slate-800"
              }`}
            >
              {item.content}
            </div>
          ))
        )}
        {pendingQuestion ? (
          <div className="chat-bubble user ml-auto max-w-[85%] rounded-xl p-3 text-white">
            {pendingQuestion}
          </div>
        ) : null}
        {isLoading ? (
          <div className="chat-bubble assistant mr-auto max-w-[85%] rounded-xl p-3 text-slate-500 flex items-center gap-2">
            <span className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        ) : null}
      </div>

      {error ? <p className="chat-error mt-3 text-sm text-red-600">{error}</p> : null}

      <form onSubmit={handleSend} className="flex gap-3 mt-4">
        <textarea
          placeholder="Ask your question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="chat-textarea flex-1 border border-slate-200 rounded-xl p-3 resize-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="chat-send-btn text-white px-6 rounded-xl font-medium disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Asking..." : "Ask"}
        </button>
      </form>
      </main>
    </div>
  );
};

export default Chat;
