import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
                "-" +
                Math.round(Math.random() * 1e9) +
                path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/pdf",
        "audio/mpeg",
        "audio/wav",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported File Type"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
    fileFilter,
});

export default upload;