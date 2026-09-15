import { useState } from "react";

const NoteCard = ({ note, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onSave({ ...note, title, content });
    setIsEditing(false);
  };

  return (
    <div
      className="bg-white shadow rounded-lg p-5 cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={4}
            className="w-full rounded-lg border px-3 py-2"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">
            {note.title}
          </h2>

          <p className="mt-3 text-gray-600">
            {note.content}
          </p>

          <p className="mt-4 text-sm text-blue-600">
            Click to edit
          </p>
        </>
      )}
    </div>
  );
};

export default NoteCard;