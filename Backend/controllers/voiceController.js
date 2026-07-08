exports.voiceToText = async (req, res) => {
    try {

        // Connect Whisper API / Google Speech API here

        res.json({
            success: true,
            transcript: "Voice converted to text successfully."
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};