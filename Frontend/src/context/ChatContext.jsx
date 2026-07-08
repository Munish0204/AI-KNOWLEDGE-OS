import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;