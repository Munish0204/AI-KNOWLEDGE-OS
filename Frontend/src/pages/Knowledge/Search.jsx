import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Search Knowledge</h1>

      <input
        type="text"
        placeholder="Search notes or documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <div className="bg-white shadow rounded-lg p-6">
        {query
          ? `Searching for "${query}"...`
          : "Search results will appear here."}
      </div>
    </div>
  );
};

export default Search;