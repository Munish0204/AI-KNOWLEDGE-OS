const Notes = () => {
  const notes = [
    "React Basics",
    "Node.js API",
    "MongoDB Queries",
    "JWT Authentication",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notes</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-5">
            <h2 className="font-semibold">{note}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;