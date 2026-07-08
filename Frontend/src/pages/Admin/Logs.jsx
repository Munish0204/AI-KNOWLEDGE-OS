const Logs = () => {
  const logs = [
    {
      id: 1,
      action: "User Login",
      user: "John",
      time: "10:15 AM",
    },
    {
      id: 2,
      action: "Document Uploaded",
      user: "Alice",
      time: "11:30 AM",
    },
    {
      id: 3,
      action: "AI Chat Request",
      user: "David",
      time: "12:45 PM",
    },
    {
      id: 4,
      action: "Password Changed",
      user: "Admin",
      time: "02:10 PM",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        System Logs
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Action</th>
              <th className="p-4">User</th>
              <th className="p-4">Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-b hover:bg-gray-100"
              >
                <td className="p-4">{log.id}</td>
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.user}</td>
                <td className="p-4">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;