const Message = ({ sender, text }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-3`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;