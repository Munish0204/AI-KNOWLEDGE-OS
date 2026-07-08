const express = require("express");
const router = express.Router();

const {
  generateSummary,
} = require("../controllers/summaryController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, generateSummary);

module.exports = router;