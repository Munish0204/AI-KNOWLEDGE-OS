import { useState } from "react";
import { uploadFile } from "../../services/uploadService";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", fileLabel || file.name);
    formData.append("description", description);

    setIsUploading(true);
    setMessage("");

    try {
      await uploadFile(formData);
      setMessage("Document uploaded successfully.");
      setFile(null);
      setFileLabel("");
      setDescription("");
    } catch (uploadError) {
      setMessage(
        uploadError?.response?.data?.message ||
          "Unable to upload the document."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Upload File</h1>

      <input
        type="file"
        onChange={(event) => {
          const selectedFile = event.target.files?.[0] ?? null;
          setFile(selectedFile);
          setFileLabel(selectedFile?.name ?? "");
        }}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        value={fileLabel}
        onChange={(event) => setFileLabel(event.target.value)}
        placeholder="Edit file name"
        className="w-full border rounded-lg p-3 mt-4"
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add file description"
        rows={4}
        className="w-full border rounded-lg p-3 mt-4"
      />

      <button
        type="button"
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {message ? <p className="mt-4 text-sm text-slate-600">{message}</p> : null}
    </div>
  );
};

export default Upload;