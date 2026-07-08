const Notification = require("../models/Notification");

const createNotification = async (
  userId,
  title,
  message
) => {
  try {
    return await Notification.create({
      user: userId,
      title,
      message,
    });
  } catch (error) {
    throw error;
  }
};

const getNotifications = async (userId) => {
  return await Notification.find({
    user: userId,
  }).sort({ createdAt: -1 });
};

module.exports = {
  createNotification,
  getNotifications,
};