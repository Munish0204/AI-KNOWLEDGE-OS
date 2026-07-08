const Upload = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Upload File</h1>

      <input
        type="file"
        className="w-full border rounded-lg p-3"
      />

      <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
        Upload
      </button>
    </div>
  );
};

export default Upload;