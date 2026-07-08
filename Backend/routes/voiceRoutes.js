const express = require("express");
const multer = require("multer");

const router = express.Router();

const { voiceToText } = require("../controllers/voiceController");

const auth = require("../middleware/authMiddleware");

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/transcribe",
  auth,
  upload.single("audio"),
  voiceToText
);

module.exports = router;