import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [hasUnreadResponse, setHasUnreadResponse] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        hasUnreadResponse,
        markResponseUnread: () => setHasUnreadResponse(true),
        markResponsesRead: () => setHasUnreadResponse(false),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;