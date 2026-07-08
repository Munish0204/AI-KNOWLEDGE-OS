const express = require("express");
const router = express.Router();

const {
  getDashboardAnalytics,
} = require("../controllers/analyticsController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, getDashboardAnalytics);

module.exports = router;