import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/constellation/${query.toLowerCase()}`);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        placeholder="Search constellation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", borderRadius: "8px", border: "none" }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px", padding: "10px" }}>
        Search
      </button>
    </div>
  );
}
