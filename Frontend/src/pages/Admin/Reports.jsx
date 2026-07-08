const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Monthly Usage Report",
      status: "Completed",
    },
    {
      id: 2,
      title: "AI Activity Report",
      status: "Pending",
    },
    {
      id: 3,
      title: "Knowledge Base Report",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white shadow rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {report.title}
              </h2>

              <p className="text-gray-500">
                Status: {report.status}
              </p>
            </div>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;