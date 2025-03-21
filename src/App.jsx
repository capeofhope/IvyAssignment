import React, { useState } from "react";
import axios from "axios";

function App() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNames = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/");
      setNames(response.data);
    } catch (error) {
      console.error("Error fetching names:", error);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1>Autocomplete Name Extractor</h1>
      <button style={styles.button} onClick={fetchNames} disabled={loading}>
        {loading ? "Loading..." : "Extract Names"}
      </button>
      <div style={styles.results}>
        {names.length > 0 ? (
          <ul>
            {names.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>No names extracted yet.</p>
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
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  results: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
  },
};

export default App;
