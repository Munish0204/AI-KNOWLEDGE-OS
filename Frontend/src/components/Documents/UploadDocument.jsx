import { useState } from "react";

const UploadDocument = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      alert("Please select a document.");
      return;
    }

    console.log(file);
    alert("Document uploaded successfully!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        Upload Document
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadDocument;