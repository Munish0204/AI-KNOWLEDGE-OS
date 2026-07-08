const NoteCard = ({ note }) => {
  return (
    <div className="bg-white shadow rounded-lg p-5">
      <h2 className="text-xl font-semibold">
        {note.title}
      </h2>

      <p className="mt-3 text-gray-600">
        {note.content}
      </p>
    </div>
  );
};

export default NoteCard;