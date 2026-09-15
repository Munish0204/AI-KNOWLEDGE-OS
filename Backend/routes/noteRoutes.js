const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.get("/:id", authMiddleware, getNote);

router.put("/:id", authMiddleware, updateNote);

router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;