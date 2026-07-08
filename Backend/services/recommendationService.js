const Note = require("../models/Note");
const Task = require("../models/Task");

const getRecommendations = async (userId) => {
  try {
    const notes = await Note.find({ user: userId }).limit(5);
    const pendingTasks = await Task.find({
      user: userId,
      completed: false,
    });

    return {
      recentNotes: notes,
      pendingTasks,
      suggestions: [
        "Review recent notes",
        "Complete pending tasks",
        "Generate AI summary",
      ],
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRecommendations,
};