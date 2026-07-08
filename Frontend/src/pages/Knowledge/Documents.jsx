const Documents = () => {
  const docs = [
    "Project_Report.pdf",
    "API_Documentation.pdf",
    "Database_Design.pdf",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      <div className="space-y-3">
        {docs.map((doc, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            📄 {doc}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;