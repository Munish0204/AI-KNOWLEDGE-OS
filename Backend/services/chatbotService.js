const {
  assistantInstructions,
  generateGeminiResponse,
  generateResponse,
} = require("./aiService");

const askChatbot = async (message, knowledgeContext = "") => {
  let reply;

  try {
    reply = await generateResponse(message, knowledgeContext);
  } catch (openAiError) {
    if (!process.env.GEMINI_API_KEY || !process.env.OPENAI_API_KEY) {
      throw openAiError;
    }

    reply = await generateGeminiResponse(
      `${assistantInstructions}\n\nKnowledge from the user's Notes, Tasks, and uploaded Documents:\n${knowledgeContext}\n\nUser question:\n${message}`
    );
  }

  if (!reply) {
    throw new Error("The AI assistant returned an empty response.");
  }

  return {
    user: message,
    assistant: reply,
  };
};

module.exports = {
  askChatbot,
};