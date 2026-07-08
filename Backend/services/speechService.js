const OpenAI = require("openai");
const fs = require("fs");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechToText = async (filePath) => {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });

    return transcription.text;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  speechToText,
};