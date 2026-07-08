const Conversation = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Conversation</h1>

      <div className="bg-blue-100 p-4 rounded-lg">
        <strong>You:</strong> Explain MERN Stack.
      </div>

      <div className="bg-green-100 p-4 rounded-lg">
        <strong>AI:</strong> MERN Stack consists of MongoDB, Express,
        React, and Node.js.
      </div>
    </div>
  );
};

export default Conversation;