const Tasks = () => {
  const tasks = [
    "Complete React Project",
    "Study MongoDB",
    "Prepare Presentation",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="bg-white shadow p-4 rounded-lg">
            {task}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;