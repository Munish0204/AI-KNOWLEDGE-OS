import api from "./api";

export const askAI = (prompt) =>
  api.post("/ai/chat", { prompt });

export const summarizeText = (text) =>
  api.post("/ai/summarize", { text });