const Note = require("../models/Note");

exports.search = async (req, res) => {
    try {

        const keyword = req.query.q;

        const results = await Note.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { content: { $regex: keyword, $options: "i" } }
            ]
        });

        res.json({
            success: true,
            results
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};