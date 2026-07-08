import { useState } from "react";

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        Audio Recorder
      </h2>

      <button
        onClick={() => setRecording(!recording)}
        className={`px-6 py-2 rounded-lg text-white ${
          recording ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {recording ? "Stop Recording" : "Start Recording"}
      </button>

      <p className="mt-4">
        {recording ? "Recording..." : "Recorder Idle"}
      </p>
    </div>
  );
};

export default AudioRecorder;