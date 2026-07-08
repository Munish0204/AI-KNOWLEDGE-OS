const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  getUsers,
} = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.get("/", auth, getUsers);

module.exports = router;