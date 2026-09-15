import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks } from "../../services/taskService";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getTasks()
      .then((response) => {
        if (isMounted) {
          setTasks(response.data.tasks || []);
        }
      })
      .catch((taskError) => {
        if (isMounted) {
          setError(
            taskError?.response?.data?.message ||
              "Unable to load your tasks."
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCreateTask = (event) => {
    event.preventDefault();

    const taskTitle = title.trim();

    if (!taskTitle || isCreating) {
      return;
    }

    setError("");
    setIsCreating(true);

    createTask({ title: taskTitle, dueDate: dueDate || undefined })
      .then((response) => {
        setTasks((currentTasks) => [response.data.task, ...currentTasks]);
        setTitle("");
        setDueDate("");
      })
      .catch((taskError) => {
        setError(
          taskError?.response?.data?.message ||
            "Unable to create the task."
        );
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id && task.id !== id));
      })
      .catch((deleteError) => {
        setError(
          deleteError?.response?.data?.message ||
            "Unable to delete the task."
        );
      });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Create Task</h1>

        <form onSubmit={handleCreateTask} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            className="border rounded-lg p-3"
            aria-label="Task due date"
          />

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={isCreating}
            className="bg-green-600 text-white px-6 rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Saving..." : "Add Task"}
          </button>
        </form>

        {error ? (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        ) : null}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Tasks</h2>

        <div className="space-y-4">
          {loading ? (
            <p className="text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="text-slate-500">No tasks yet.</p>
          ) : tasks.map((task) => (
            <div key={task._id || task.id} className="bg-white shadow p-4 rounded-lg">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium">{task.title}</p>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task._id || task.id)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
              {task.dueDate ? (
                <p className="mt-1 text-sm text-slate-500">
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;