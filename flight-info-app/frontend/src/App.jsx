import React, { useState } from "react";
import FlightCard from "./components/FlightCard";

export default function App() {
  const [code, setCode] = useState("");
  const [flight, setFlight] = useState(null);
  const [allFlights, setAllFlights] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFlight = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setFlight(null);
    setAllFlights([]);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5001/api/flight?code=${code.toUpperCase()}`);
      const data = await res.json();
      if (res.ok) {
        setFlight(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to fetch flight info");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFlights = async () => {
    setLoading(true);
    setFlight(null);
    setAllFlights([]);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5001/api/flight/all`);
      const data = await res.json();
      if (res.ok) {
        setAllFlights(data);
      } else {
        setError("Failed to load all flights.");
      }
    } catch (err) {
      setError("Error fetching all flights.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchFlight();
  };

  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      backgroundColor: "#0f172a",
      minHeight: "100vh",
      color: "#f1f5f9",
      fontFamily: "sans-serif"
    }}>
      <h1 style={{ color: "#38bdf8" }}>🛫 Flight Info Viewer</h1>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter flight code (e.g. EK215)"
        style={{
          padding: "0.75rem",
          width: "260px",
          borderRadius: "999px",
          border: "1px solid #334155",
          outline: "none",
          fontSize: "1rem",
          marginTop: "1rem",
          backgroundColor: "#1e293b",
          color: "#fff"
        }}
      />
      <br />

      <button
        onClick={fetchFlight}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.5rem",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#38bdf8",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
          marginRight: "0.5rem"
        }}
      >
        Search
      </button>

      <button
        onClick={fetchAllFlights}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.5rem",
          borderRadius: "999px",
          border: "none",
          backgroundColor: "#22c55e",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Show All Flights
      </button>

      {loading && <p style={{ marginTop: "1rem" }}>Loading...</p>}
      {error && <p style={{ color: "#f87171", marginTop: "1rem" }}>{error}</p>}

      {flight && <FlightCard flight={flight} />}

      {allFlights.length > 0 && (
        <div style={{ marginTop: "2rem", display: "grid", gap: "2rem" }}>
          {allFlights.map((f, index) => (
            <FlightCard key={f.flight?.iata || index} flight={f} />
          ))}
        </div>
      )}
    </div>
  );
}