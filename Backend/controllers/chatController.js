const Chat = require("../models/Chat");
const mongoose = require("mongoose");
const { askChatbot } = require("../services/chatbotService");
const { buildKnowledgeContext } = require("../services/knowledgeContextService");

exports.ask = async (req, res) => {
  try {
    const message = req.body.message?.trim();

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "A question is required",
      });
    }

    const knowledgeContext = await buildKnowledgeContext(req.user.id);
    const result = await askChatbot(message, knowledgeContext);
    const chat = await Chat.create({
      user: req.user.id,
      title: message.slice(0, 60),
      messages: [
        { role: "user", content: result.user },
        { role: "assistant", content: result.assistant },
      ],
    });

    return res.status(200).json({
      success: true,
      question: result.user,
      reply: result.assistant,
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Unable to get an AI response",
    });
  }
};

// =========================
// Create New Chat
// =========================
exports.createChat = async (req, res) => {
  try {
    const { title } = req.body;

    const chat = await Chat.create({
      user: req.user.id,
      title: title || "New Chat",
      messages: [],
    });

    return res.status(201).json({
      success: true,
      message: "Chat created successfully",
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get All Chats
// =========================
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: chats.length,
      chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Get Single Chat
// =========================
exports.getChat = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat id",
      });
    }

    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Add Message
// =========================
exports.addMessage = async (req, res) => {
  try {
    const { role, content } = req.body;

    if (!role || !content) {
      return res.status(400).json({
        success: false,
        message: "Role and content are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat id",
      });
    }

    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.messages.push({
      role,
      content,
      timestamp: new Date(),
    });

    await chat.save();

    return res.status(200).json({
      success: true,
      message: "Message added successfully",
      chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// Delete Chat
// =========================
exports.deleteChat = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat id",
      });
    }

    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};