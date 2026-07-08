import { useState } from "react";

const Recorder = () => {
  const [recording, setRecording] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Audio Recorder</h1>

      <button
        onClick={() => setRecording(!recording)}
        className={`px-6 py-3 rounded-lg text-white ${
          recording ? "bg-red-500" : "bg-blue-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <p className="mt-4">
        {recording
          ? "Recording in progress..."
          : "Recorder is idle."}
      </p>
    </div>
  );
};

export default Recorder;