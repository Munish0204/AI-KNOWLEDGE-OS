const express = require("express");
const router = express.Router();

const {
  createChat,
  getChats,
  getChat,
  addMessage,
  deleteChat,
} = require("../controllers/chatController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createChat);
router.get("/", auth, getChats);
router.get("/:id", auth, getChat);
router.post("/:id/message", auth, addMessage);
router.delete("/:id", auth, deleteChat);

module.exports = router;