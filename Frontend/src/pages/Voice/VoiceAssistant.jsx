import { useState } from "react";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    setListening(!listening);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Voice Assistant
      </h1>

      <div className="text-center">
        <button
          onClick={toggleListening}
          className={`px-8 py-3 rounded-lg text-white ${
            listening ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>

        <p className="mt-6 text-gray-600">
          {listening
            ? "🎤 Listening..."
            : "Click the button to start voice recognition."}
        </p>
      </div>
    </div>
  );
};

export default VoiceAssistant;