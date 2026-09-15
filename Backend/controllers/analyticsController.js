const Note = require("../models/Note");
const Task = require("../models/Task");
const Chat = require("../models/Chat");
const Document = require("../models/Document");

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

        const documentCount = await Document.countDocuments({
            user: req.user.id
        });

        const [notes, tasks, chats, documents] = await Promise.all([
            Note.find({ user: req.user.id })
                .select("title createdAt")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
            Task.find({ user: req.user.id })
                .select("title createdAt")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
            Chat.find({ user: req.user.id })
                .select("title createdAt")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean(),
            Document.find({ user: req.user.id })
                .select("title filename fileUrl fileType size createdAt")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()
        ]);

        const recentActivity = [
            ...notes.map((note) => ({
                id: `note-${note._id}`,
                message: `Created note "${note.title}"`,
                createdAt: note.createdAt
            })),
            ...tasks.map((task) => ({
                id: `task-${task._id}`,
                message: `Created task "${task.title}"`,
                createdAt: task.createdAt
            })),
            ...chats.map((chat) => ({
                id: `chat-${chat._id}`,
                message: `Started AI chat "${chat.title || "Untitled chat"}"`,
                createdAt: chat.createdAt
            })),
            ...documents.map((document) => ({
                id: `document-${document._id}`,
                message: `Uploaded document "${document.title || document.filename || "Untitled document"}"`,
                createdAt: document.createdAt
            }))
        ]
            .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
            .slice(0, 5);

        res.json({
            success: true,
            analytics: {
                totalNotes: noteCount,
                totalTasks: taskCount,
                completedTasks,
                totalChats: chatCount,
                totalDocuments: documentCount,
                documents,
                recentActivity
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};