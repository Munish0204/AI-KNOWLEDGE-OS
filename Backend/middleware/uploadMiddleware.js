const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination(req, file, cb) {
        cb(null, "uploads/");
    },

    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const fileFilter = (req, file, cb) => {

    const allowed = [
        "image/png",
        "image/jpeg",
        "application/pdf",
        "audio/mpeg",
        "audio/wav",
        "text/plain"
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file type"), false);
    }

};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
});

module.exports = upload;