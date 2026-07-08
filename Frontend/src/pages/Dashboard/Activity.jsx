const Activity = () => {
  const activities = [
    "Created a new note",
    "Completed a task",
    "Started an AI chat",
    "Updated profile",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Recent Activity</h1>

      <ul className="space-y-3">
        {activities.map((item, index) => (
          <li key={index} className="bg-white p-4 rounded-lg shadow">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activity;