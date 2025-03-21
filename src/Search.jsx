import React, { useState, useCallback } from "react";
import axios from "axios";
// import debounce from "lodash.debounce";

function Search() {
  const [query, setQuery] = useState("");
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch names based on input query
  const fetchNames = async (searchQuery) => {
    if (!searchQuery) {
      setNames([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}`);
      setNames(response.data);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
    setLoading(false);
  };

  // Debounced version of fetchNames to limit API calls
//   const debouncedFetchNames = useCallback(debounce(fetchNames, 500), []);

  // Handle input change and trigger debounced API call
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchNames(value);
  };

  return (
    <div style={styles.container}>
      <h1>Search Names</h1>
      <input
        type="text"
        placeholder="Enter prefix..."
        value={query}
        onChange={handleInputChange}
        style={styles.input}
      />
      {loading && <p>Loading...</p>}
      <div style={styles.results}>
        {names.length > 0 ? (
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          !loading && <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  results: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
  },
};

export default Search;
