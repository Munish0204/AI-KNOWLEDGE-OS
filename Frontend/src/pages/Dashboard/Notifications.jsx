const Notifications = () => {
  const notifications = [
    "Your profile has been updated.",
    "Task deadline is tomorrow.",
    "New AI feature available.",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {notifications.map((note, index) => (
          <div key={index} className="bg-yellow-100 p-4 rounded-lg shadow">
            {note}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;