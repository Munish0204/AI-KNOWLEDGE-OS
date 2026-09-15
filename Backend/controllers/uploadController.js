const path = require("path");
const Document = require("../models/Document");

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const document = await Document.create({
            user: req.user.id,
            title: req.body.title || req.file.originalname,
            filename: req.file.filename,
            fileUrl: `/uploads/${req.file.filename}`,
            fileType: req.file.mimetype,
            size: req.file.size
        });

        res.json({
            success: true,
            document,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};