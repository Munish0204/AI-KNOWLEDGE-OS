require("dotenv").config();

const mongoose = require("mongoose");

const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

async function seed() {

    await User.deleteMany();

    await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "$2b$10$examplehashedpassword",
        role: "admin"
    });

    console.log("Database Seeded");

    process.exit();
}

seed();