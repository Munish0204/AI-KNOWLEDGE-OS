import { useEffect, useState } from "react";
import { getTasks } from "../../services/taskService";

const Reminder = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((response) => setTasks(response.data.tasks || []));
  }, []);

  const upcomingTasks = tasks
    .filter((task) => task.dueDate && !task.completed)
    .sort((first, second) => new Date(first.dueDate) - new Date(second.dueDate));

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Reminders</h1>

      {upcomingTasks.length === 0 ? (
        <p className="text-slate-500">No upcoming reminders.</p>
      ) : (
        <ul className="space-y-3">
          {upcomingTasks.map((task) => (
            <li key={task._id} className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="font-medium text-slate-800">{task.title}</p>
              <p className="mt-1 text-sm text-amber-700">
                Due {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reminder;