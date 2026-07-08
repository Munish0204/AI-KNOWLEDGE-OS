const express = require("express");
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

module.exports = router;