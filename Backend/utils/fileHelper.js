const fs = require("fs");
const path = require("path");

// Delete File
const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.log(error);
    }
};

// Get File Extension
const getExtension = (filename) => {
    return path.extname(filename);
};

// Create Folder
const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {
            recursive: true
        });
    }
};

module.exports = {
    deleteFile,
    getExtension,
    createFolder
};