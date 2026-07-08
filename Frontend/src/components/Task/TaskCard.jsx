const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-lg font-semibold">
        {task.title}
      </h2>

      <p className="text-gray-500 mt-2">
        {task.description}
      </p>

      <span
        className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${
          task.completed
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
};

export default TaskCard;