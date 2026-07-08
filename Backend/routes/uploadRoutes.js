const express = require("express");
const multer = require("multer");
const router = express.Router();

const { uploadFile } = require("../controllers/uploadController");

const auth = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", auth, upload.single("file"), uploadFile);

module.exports = router;