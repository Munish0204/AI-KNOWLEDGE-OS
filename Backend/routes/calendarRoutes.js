const express = require("express");
const mongoose = require("mongoose");
const Reminder = require("../models/Reminder");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/important-dates", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id })
      .sort({ reminderDate: 1 })
      .lean();

    return res.json({
      success: true,
      importantDates: reminders.map((reminder) => ({
        _id: reminder._id,
        title: reminder.title,
        date: reminder.reminderDate,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/important-dates", auth, async (req, res) => {
  try {
    const title = req.body.title?.trim();
    const date = req.body.date;

    if (!title || !date || Number.isNaN(new Date(date).getTime())) {
      return res.status(400).json({
        success: false,
        message: "A title and valid date are required",
      });
    }

    const reminder = await Reminder.create({
      user: req.user.id,
      title,
      reminderDate: new Date(date),
    });

    return res.status(201).json({
      success: true,
      importantDate: {
        _id: reminder._id,
        title: reminder.title,
        date: reminder.reminderDate,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/important-dates/:id", auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid important date id",
      });
    }

    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Important date not found",
      });
    }

    return res.json({
      success: true,
      message: "Important date deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
