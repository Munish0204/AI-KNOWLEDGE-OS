const ChatHistory = () => {
  const chats = [
    "Explain React Hooks",
    "Generate Node.js API",
    "MongoDB Aggregation",
    "Tailwind CSS Guide",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Chat History</h1>

      <div className="space-y-3">
        {chats.map((chat, index) => (
          <div
            key={index}
            className="bg-white shadow rounded-lg p-4 hover:bg-gray-100 cursor-pointer"
          >
            {chat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;