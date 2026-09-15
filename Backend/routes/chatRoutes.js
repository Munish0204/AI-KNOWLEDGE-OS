const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createChat,
  getChats,
  getChat,
  addMessage,
  deleteChat,
  ask,
} = require("../controllers/chatController");

router.post("/ask", authMiddleware, ask);
router.post("/", authMiddleware, createChat);

router.get("/", authMiddleware, getChats);

router.get("/history", authMiddleware, getChats);

router.get("/:id", authMiddleware, getChat);

router.post("/:id/message", authMiddleware, addMessage);

router.delete("/:id", authMiddleware, deleteChat);

module.exports = router;