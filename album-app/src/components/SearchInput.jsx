import React, { useState } from "react";

function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        value={query}
        placeholder="Search albums..."
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
export default SearchInput;
