const OpenAI = require("openai");

const assistantInstructions = `You are the AI assistant for AI Knowledge OS.
Help the user understand how to use the app and answer questions clearly.
The app supports:
- Notes: create a note with a required title and content, and optional tags.
- Tasks: create a task with a title, description, priority (Low, Medium, or High), and optional due date.
- Documents: upload a file from the Upload page; uploaded documents appear in Documents and on the dashboard.
- AI chat: answer questions and explain how to use Notes, Tasks, Documents, and the dashboard.
Give concise step-by-step guidance when the user asks how to create or find something.
Do not claim that you created, changed, uploaded, or deleted data. Explain that the user must use the relevant page or button to perform that action.
Use plain text formatting only. Do not use Markdown bold, asterisks, or triple asterisks. Use simple headings and hyphen bullets when needed.`;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const generateGeminiResponse = async (prompt) => {
  const { GoogleGenAI } = await import("@google/genai");
  const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await gemini.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      const reply = response.text?.trim();

      if (!reply) {
        throw new Error("The AI provider returned an empty response.");
      }

      return reply;
    } catch (error) {
      const status = error?.status || error?.code;
      const isTemporaryError = status === 429 || status === 503;

      if (!isTemporaryError || attempt === 2) {
        throw error;
      }

      await wait(500 * (attempt + 1));
    }
  }

  throw new Error("Gemini is temporarily unavailable.");
};

const generateResponse = async (prompt, knowledgeContext = "") => {
  const userPrompt = knowledgeContext
    ? `Knowledge from the user's Notes, Tasks, and uploaded Documents:\n${knowledgeContext}\n\nUser question:\n${prompt}`
    : prompt;

  if (openai) {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: assistantInstructions,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return response.choices[0].message.content;
  }

  if (process.env.GEMINI_API_KEY) {
    return generateGeminiResponse(`${assistantInstructions}\n\n${userPrompt}`);
  }

  throw new Error("No AI provider API key is configured.");
};

module.exports = {
  assistantInstructions,
  generateGeminiResponse,
  generateResponse,
};