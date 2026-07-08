import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-[80vh] flex flex-col">
      <h1 className="text-3xl font-bold mb-4">AI Chat</h1>

      <div className="flex-1 border rounded-lg p-4 overflow-y-auto bg-gray-50">
        <p className="text-gray-500">
          Start a conversation with your AI assistant.
        </p>
      </div>

      <form onSubmit={handleSend} className="flex gap-3 mt-4">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border rounded-lg p-3"
        />

        <button className="bg-blue-600 text-white px-6 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;