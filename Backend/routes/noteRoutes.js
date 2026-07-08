const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;