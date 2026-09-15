import api from "./api";

export const sendMessage = (message) =>
  api.post("/chat", { message });

export const getChatHistory = () =>
  api.get("/chat/history");

export const deleteChat = (chatId) =>
  api.delete(`/chat/${chatId}`);