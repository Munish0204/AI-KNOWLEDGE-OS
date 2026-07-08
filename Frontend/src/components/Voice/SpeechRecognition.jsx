import { useState } from "react";

const SpeechRecognition = () => {
  const [text, setText] = useState("");

  const startRecognition = () => {
    setText("Speech recognition result will appear here...");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">
        Speech Recognition
      </h2>

      <button
        onClick={startRecognition}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Start Recognition
      </button>

      <div className="mt-6 border rounded-lg p-4 bg-gray-50">
        {text}
      </div>
    </div>
  );
};

export default SpeechRecognition;