const Dashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3>Total Notes</h3>
          <p className="text-3xl font-bold">25</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3>Tasks</h3>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3>AI Chats</h3>
          <p className="text-3xl font-bold">47</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;