const { generateResponse } = require("./aiService");

const summarizeText = async (text) => {
  try {
    const prompt = `
Summarize the following content in concise bullet points:

${text}
`;

    return await generateResponse(prompt);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  summarizeText,
};