import React, { useEffect, useState } from "react";
import FlightCard from "./FlightCard";

export default function AllFlights() {
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/flight/all");
                const data = await res.json();
                if (res.ok) {
                    setFlights(data);
                } else {
                    setError("Failed to load flights.");
                }
            } catch (err) {
                setError("Error fetching flight data.");
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    if (loading) {
        return <p style={{ textAlign: "center", marginTop: "2rem", color: "#f1f5f9" }}>Loading all flights...</p>;
    }

    if (error) {
        return <p style={{ textAlign: "center", marginTop: "2rem", color: "#f87171" }}>{error}</p>;
    }

    return (
        <div style={{
            backgroundColor: "#0f172a",
            minHeight: "100vh",
            padding: "2rem",
            fontFamily: "Segoe UI, sans-serif"
        }}>
            <h1 style={{
                textAlign: "center",
                color: "#38bdf8",
                marginBottom: "2rem",
                fontWeight: 600
            }}>
                ✈️ All Active Flights
            </h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                gap: "2rem",
                padding: "1rem",
                maxWidth: "1400px",
                margin: "0 auto"
            }}>
                {flights.map((flight, index) => (
                    <FlightCard key={flight.flight?.iata || index} flight={flight} />
                ))}
            </div>
        </div>
    );
}