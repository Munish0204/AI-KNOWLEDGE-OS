const Chat = require("../models/Chat");

// Create Chat
exports.createChat = async (req, res) => {
  try {
    const { title } = req.body;

    const chat = await Chat.create({
      user: req.user.id,
      title,
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Chats
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Chat
exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add Message
exports.addMessage = async (req, res) => {
  try {
    const { role, content } = req.body;

    const chat = await Chat.findById(req.params.id);

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

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Chat
exports.deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};