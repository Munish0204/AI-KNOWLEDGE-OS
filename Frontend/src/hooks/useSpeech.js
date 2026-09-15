import { useState } from "react";

const useSpeech = () => {
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    setTranscript("Listening...");
  };

  const stopListening = () => {
    setTranscript("Speech recognition stopped.");
  };

  return {
    transcript,
    startListening,
    stopListening,
  };
};

export default useSpeech;