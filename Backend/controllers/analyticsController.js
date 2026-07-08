const Note = require("../models/Note");
const Task = require("../models/Task");
const Chat = require("../models/Chat");

exports.getDashboardAnalytics = async (req, res) => {
    try {

        const noteCount = await Note.countDocuments({
            user: req.user.id
        });

        const taskCount = await Task.countDocuments({
            user: req.user.id
        });

        const completedTasks = await Task.countDocuments({
            user: req.user.id,
            completed: true
        });

        const chatCount = await Chat.countDocuments({
            user: req.user.id
        });

        res.json({
            success: true,
            analytics: {
                totalNotes: noteCount,
                totalTasks: taskCount,
                completedTasks,
                totalChats: chatCount
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};