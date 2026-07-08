exports.generateSummary = async (req, res) => {
    try {

        const { text } = req.body;

        // Call OpenAI API Here

        res.json({
            success: true,
            summary: text.substring(0, 200) + "..."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};