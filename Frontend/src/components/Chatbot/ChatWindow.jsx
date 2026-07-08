import { useState } from "react";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import ChatInput from "./ChatInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);

  const handleSend = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text,
      },
      {
        sender: "bot",
        text: "This is a demo AI response.",
      },
    ]);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
      <ChatHeader />

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;