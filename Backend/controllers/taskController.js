const Task = require("../models/Task");

// Create Task
exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            user: req.user.id,
            ...req.body
        });

        res.status(201).json({
            success: true,
            task
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get Tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });

        res.json({
            success: true,
            tasks
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            task
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Task deleted"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};