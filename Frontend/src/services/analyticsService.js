import api from "./api";

export const getDashboardAnalytics = () => api.get("/analytics");