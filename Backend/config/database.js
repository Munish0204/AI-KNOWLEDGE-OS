const mongoose = require('mongoose')

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI

    if (!mongoUri) {
        throw new Error('MongoDB connection string is missing. Set MONGO_URI or MONGODB_URI in Backend/.env.')
    }

    if (!mongoUri.startsWith('mongodb://') && !mongoUri.startsWith('mongodb+srv://')) {
        throw new Error('Invalid MongoDB URI. It must start with "mongodb://" or "mongodb+srv://".')
    }

    try {
        const conn = await mongoose.connect(mongoUri)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        throw new Error(
            `Could not connect to MongoDB using the configured URI: ${error.message}`
        )
    }
}

module.exports = connectDB