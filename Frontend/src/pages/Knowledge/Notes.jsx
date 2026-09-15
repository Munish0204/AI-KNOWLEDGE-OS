import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createNote, deleteNote, getNotes } from "../../services/noteService";

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "React Basics",
      content: "Learn components, props, and state.",
    },
    {
      id: 2,
      title: "Node.js API",
      content: "Build REST endpoints with Express.",
    },
    {
      id: 3,
      title: "MongoDB Queries",
      content: "Practice find, update, and aggregation.",
    },
    {
      id: 4,
      title: "JWT Authentication",
      content: "Protect routes with token-based auth.",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getNotes()
      .then((response) => {
        setNotes(response.data.notes || []);
      })
      .catch((fetchError) => {
        if (fetchError?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          fetchError?.response?.data?.message ||
            "Failed to load notes from the server."
        );
      });
  }, [navigate]);

  const handleCreateNote = (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    setError("");

    createNote({ title: title.trim(), content: content.trim() })
      .then((response) => {
        setNotes((currentNotes) => [response.data.note, ...currentNotes]);
        setTitle("");
        setContent("");
      })
      .catch((createError) => {
        if (createError?.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          createError?.response?.data?.message ||
            "Failed to create note."
        );
      });
  };

  const handleDeleteNote = (id) => {
    deleteNote(id)
      .then(() => {
        setNotes((currentNotes) => currentNotes.filter((note) => note._id !== id && note.id !== id));
      })
      .catch((deleteError) => {
        setError(
          deleteError?.response?.data?.message ||
            "Failed to delete note."
        );
      });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Create Note</h1>

        {error ? (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleCreateNote} className="space-y-4">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Write your note..."
            rows={5}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Add Note
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Notes</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note._id || note.id} className="bg-white shadow rounded-lg p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold">{note.title}</h3>
                <button
                  type="button"
                  onClick={() => handleDeleteNote(note._id || note.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              <p className="mt-3 text-gray-600">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;