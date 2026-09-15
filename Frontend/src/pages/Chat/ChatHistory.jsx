import { useEffect, useState } from "react";
import { getChatHistory } from "../../services/chatService";

const ChatHistory = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getChatHistory()
      .then((response) => {
        if (isMounted) {
          setChats(response.data.chats ?? []);
        }
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
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getChatDate = (chat) => {
    const latestMessage = chat.messages?.[chat.messages.length - 1];
    const date = latestMessage?.timestamp || chat.updatedAt || chat.createdAt;

    return date
      ? new Date(date).toLocaleString([], {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "";
  };

  return (
    <div className="history-shell">
      <style>{`
        .history-shell {
          max-width: 720px;
          margin: 0 auto;
        }
        .history-title {
          background: linear-gradient(90deg, #4F46E5, #9333EA);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .history-sub {
          color: #9a988f;
          font-size: 0.88rem;
          margin-top: -1.1rem;
          margin-bottom: 1.5rem;
        }
        .history-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          background: #ffffff;
          border: 1px solid #ECEAE3;
          border-radius: 14px;
          padding: 1rem 1.1rem;
          cursor: pointer;
          overflow: hidden;
          opacity: 0;
          transform: translateY(10px);
          animation: cardIn 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--delay);
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 250ms ease,
                      border-color 250ms ease;
        }
        .history-card:hover {
          transform: translateY(-3px);
          border-color: transparent;
          box-shadow: 0 14px 30px -16px rgba(79, 70, 229, 0.35),
                      0 2px 8px rgba(20, 20, 20, 0.05);
        }
        .history-card::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #4F46E5, #9333EA);
          transform: scaleY(0);
          transition: transform 250ms ease;
        }
        .history-card:hover::after {
          transform: scaleY(1);
        }
        .history-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #F1ECFC;
          color: #7A54D6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .history-card:hover .history-icon {
          transform: scale(1.1) rotate(-4deg);
        }
        .history-text {
          flex: 1;
          min-width: 0;
        }
        .history-chat-title {
          color: #23231F;
          font-weight: 500;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .history-date {
          color: #9a988f;
          font-size: 0.78rem;
          margin-top: 0.15rem;
        }
        .history-arrow {
          color: #C9C6BA;
          transition: transform 250ms ease, color 250ms ease;
        }
        .history-card:hover .history-arrow {
          transform: translateX(3px);
          color: #7A54D6;
        }
        .history-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 3.5rem 1rem;
          color: #9a988f;
          background: #FAFAF9;
          border: 1px dashed #ECEAE3;
          border-radius: 14px;
        }
        .history-empty-icon {
          font-size: 2rem;
          opacity: 0.7;
        }
        @keyframes cardIn {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .history-card { animation: none !important; opacity: 1; transform: none; }
          .history-card:hover { transform: none; }
        }
      `}</style>

      <h1 className="history-title text-3xl font-bold mb-1">Chat History</h1>
      <p className="history-sub">Revisit your past conversations with the AI assistant.</p>

      {loading ? <p className="text-slate-500">Loading chat history...</p> : null}
      {error ? <p className="text-red-600">{error}</p> : null}

      {!loading && !error && chats.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-icon">🗂️</span>
          <p>No conversations yet. Start a new chat to see it here.</p>
        </div>
      ) : !loading && !error ? (
        <div className="space-y-3">
          {chats.map((chat, index) => (
            <div
              key={chat.id ?? index}
              className="history-card"
              style={{ "--delay": `${index * 70}ms` }}
            >
              <span className="history-icon">💬</span>
              <div className="history-text">
                <p className="history-chat-title">
                  {typeof chat === "string" ? chat : chat.title}
                </p>
                <p className="history-date">{getChatDate(chat)}</p>
              </div>
              <span className="history-arrow">→</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ChatHistory;