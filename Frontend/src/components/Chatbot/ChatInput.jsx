import { useState } from "react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t p-4"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="flex-1 border rounded-lg px-4 py-2"
      />

      <button
        className="bg-blue-600 text-white px-5 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;