const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: 250,
    },
    {
      title: "Documents",
      value: 120,
    },
    {
      title: "AI Requests",
      value: 1520,
    },
    {
      title: "Reports",
      value: 18,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-gray-600">{item.title}</h2>

            <p className="text-3xl font-bold mt-3">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;