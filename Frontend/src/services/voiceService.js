import api from "./api";

export const speechToText = (audio) =>
  api.post("/voice/transcribe", audio);

export const textToSpeech = (text) =>
  api.post("/voice/speak", { text });