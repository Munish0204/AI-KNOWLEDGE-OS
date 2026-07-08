const express = require("express");
const router = express.Router();

const {
  search,
} = require("../controllers/searchController");

const auth = require("../middleware/authMiddleware");

router.get("/", auth, search);

module.exports = router;