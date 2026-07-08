const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <span className="animate-bounce">•</span>
      <span className="animate-bounce delay-100">•</span>
      <span className="animate-bounce delay-200">•</span>
      <span>AI is typing...</span>
    </div>
  );
};

export default TypingIndicator;