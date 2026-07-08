const NotificationMenu = () => {
  const notifications = [
    "New document uploaded",
    "Task reminder",
    "AI response completed",
  ];

  return (
    <div className="relative group">
      <button className="text-2xl">
        🔔
      </button>

      <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-lg shadow-lg hidden group-hover:block">
        {notifications.map((item, index) => (
          <div
            key={index}
            className="p-3 border-b last:border-none hover:bg-gray-100"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationMenu;