const fs = require("fs/promises");
const path = require("path");
const mammoth = require("mammoth");
const { PDFParse } = require("pdf-parse");
const Note = require("../models/Note");
const Task = require("../models/Task");
const Document = require("../models/Document");

const MAX_DOCUMENT_CHARS = 12000;
const MAX_CONTEXT_CHARS = 30000;

const getDocumentText = async (document) => {
  if (!document.filename) {
    return "";
  }

  const filePath = path.resolve(__dirname, "../uploads", document.filename);
  const uploadsPath = path.resolve(__dirname, "../uploads");

  if (!filePath.startsWith(`${uploadsPath}${path.sep}`)) {
    return "";
  }

  try {
    const fileBuffer = await fs.readFile(filePath);

    if (document.fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value.slice(0, MAX_DOCUMENT_CHARS);
    }

    if (
      document.fileType?.startsWith("text/") ||
      document.fileType === "application/json"
    ) {
      return fileBuffer.toString("utf8").slice(0, MAX_DOCUMENT_CHARS);
    }

    if (document.fileType === "application/pdf") {
      const parser = new PDFParse({ data: fileBuffer });
      const result = await parser.getText();
      await parser.destroy();
      return result.text.slice(0, MAX_DOCUMENT_CHARS);
    }
  } catch {
    return "";
  }

  return "";
};

const buildKnowledgeContext = async (userId) => {
  const [notes, tasks, documents] = await Promise.all([
    Note.find({ user: userId })
      .select("title content tags createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
    Task.find({ user: userId })
      .select("title description priority completed dueDate createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
    Document.find({ user: userId })
      .select("title filename fileType createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
  ]);

  const documentContext = await Promise.all(
    documents.map(async (document) => ({
      ...document,
      text: await getDocumentText(document),
    }))
  );

  const context = [
    "USER'S NOTES:",
    ...notes.map(
      (note) => `- ${note.title}: ${note.content || "No content"} Tags: ${(note.tags || []).join(", ")}`
    ),
    "USER'S TASKS:",
    ...tasks.map(
      (task) => `- ${task.title}: ${task.description || "No description"}; Priority: ${task.priority}; Status: ${task.completed ? "Completed" : "Pending"}; Due: ${task.dueDate || "Not set"}`
    ),
    "USER'S UPLOADED DOCUMENTS:",
    ...documentContext.map(
      (document) => `- ${document.title || document.filename} (${document.fileType || "unknown type"}): ${document.text || "Text could not be extracted; refer to the document name."}`
    ),
  ].join("\n");

  return context.slice(0, MAX_CONTEXT_CHARS);
};

module.exports = {
  buildKnowledgeContext,
};
