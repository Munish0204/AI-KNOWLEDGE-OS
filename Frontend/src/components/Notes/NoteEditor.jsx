import { useState } from "react";

const NoteEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const saveNote = () => {
    console.log({
      title,
      content,
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-4"
      />

      <textarea
        rows="6"
        placeholder="Write your note..."
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      <button
        onClick={saveNote}
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Save Note
      </button>
    </div>
  );
};

export default NoteEditor;