const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
    try {
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags || []
        });

        res.status(201).json({
            success: true,
            note
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get Notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });

        res.json({
            success: true,
            notes
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update Note
exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            note
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete Note
exports.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Note deleted"
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};