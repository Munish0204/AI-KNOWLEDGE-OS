const DocumentCard = ({ document }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg">
      <h3 className="text-lg font-semibold">
        {document.title}
      </h3>

      <p className="text-gray-500 mt-2">
        Type: {document.type}
      </p>

      <p className="text-gray-500">
        Size: {document.size}
      </p>

      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        View
      </button>
    </div>
  );
};

export default DocumentCard;