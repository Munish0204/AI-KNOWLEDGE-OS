const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const mammoth = require("mammoth");
const router = express.Router();

const Document = require("../models/Document");
const auth = require("../middleware/authMiddleware");

// Create Document
router.post("/", auth, async (req, res) => {
  try {
    const document = await Document.create({
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      document,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get Documents
router.get("/", auth, async (req, res) => {
  try {
    const documents = await Document.find({
      user: req.user.id,
    });

    res.json({
      success: true,
      documents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id/text", auth, async (req, res) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    if (!document.filename || document.fileType !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      return res.status(400).json({
        success: false,
        message: "Text preview is available for Word documents only",
      });
    }

    const filePath = path.resolve(__dirname, "../uploads", document.filename);
    const fileBuffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer: fileBuffer });

    return res.type("text/plain").send(result.value);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to read document text",
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const document = await Document.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }

    return res.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;