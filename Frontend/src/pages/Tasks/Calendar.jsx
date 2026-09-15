import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getTasks()
      .then((response) => setTasks(response.data.tasks || []))
      .catch(() => setError("Unable to load your calendar."));
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>

      {error ? <p className="text-red-600">{error}</p> : null}
      <div className="space-y-3">
        {tasks.filter((task) => task.dueDate).length === 0 ? (
          <p className="text-slate-500">No tasks with due dates.</p>
        ) : tasks.filter((task) => task.dueDate).map((task) => (
          <div key={task._id} className="rounded-lg border border-slate-200 p-4">
            <p className="font-medium text-slate-800">{task.title}</p>
            <p className="mt-1 text-sm text-indigo-600">
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;