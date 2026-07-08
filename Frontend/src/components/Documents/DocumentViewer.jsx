const DocumentViewer = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap">
        {content}
      </div>
    </div>
  );
};

export default DocumentViewer;