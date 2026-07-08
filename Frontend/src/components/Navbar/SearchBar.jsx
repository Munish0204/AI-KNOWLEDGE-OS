import { useState } from "react";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-80 px-4 py-2 rounded-lg text-black"
    />
  );
};

export default SearchBar;