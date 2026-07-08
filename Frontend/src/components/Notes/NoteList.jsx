import NoteCard from "./NoteCard";

const notes = [
  {
    id: 1,
    title: "React",
    content: "React is a JavaScript library."
  },
  {
    id: 2,
    title: "Node.js",
    content: "Node.js is used for backend development."
  },
  {
    id: 3,
    title: "MongoDB",
    content: "MongoDB is a NoSQL database."
  },
];

const NoteList = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
};

export default NoteList;