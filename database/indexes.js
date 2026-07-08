const User = require("../models/User");
const Note = require("../models/Note");
const Chat = require("../models/Chat");
const Task = require("../models/Task");

async function createIndexes() {

    await User.collection.createIndex(
        { email: 1 },
        { unique: true }
    );

    await Note.collection.createIndex({
        title: "text",
        content: "text"
    });

    await Chat.collection.createIndex({
        user: 1
    });

    await Task.collection.createIndex({
        completed: 1
    });

    console.log("Indexes Created");
}

module.exports = createIndexes;