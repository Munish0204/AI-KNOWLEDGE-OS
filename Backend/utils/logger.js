const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "../logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logFile = path.join(logDirectory, "app.log");

const logger = (message) => {
    const log = `[${new Date().toISOString()}] ${message}\n`;

    console.log(log);

    fs.appendFileSync(logFile, log);
};

module.exports = logger;