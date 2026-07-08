const { Pinecone } = require("@pinecone-database/pinecone");

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX);

const searchVector = async (embedding) => {
  try {
    const results = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    return results.matches;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchVector,
};