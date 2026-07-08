const { generateResponse } = require("./aiService");

const askChatbot = async (message) => {
  try {
    const reply = await generateResponse(message);

    return {
      user: message,
      assistant: reply,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  askChatbot,
};