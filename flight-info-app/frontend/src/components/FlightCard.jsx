import React from "react";

export default function FlightCard({ flight }) {
    const {
        flight_date,
        flight_status,
        departure,
        arrival,
        airline,
        flight: flightInfo,
        localDepartureTime,
        localArrivalTime
    } = flight;

    const formatTime = (iso, zone) => {
        if (!iso) return "N/A";
        try {
            const [date, time] = localDepartureTime.split(", ");
            return `${time} ${zone === "Asia/Manila" ? "PST" : zone === "Asia/Tokyo" ? "JST" : ""}`;
        } catch {
            return iso;
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "scheduled":
                return "#4ade80"; // green
            case "delayed":
                return "#facc15"; // yellow
            case "cancelled":
                return "#f87171"; // red
            default:
                return "#4ade80"; // default green
        }
    };

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            backgroundColor: "#4ade80",
            borderRadius: "12px",
            overflow: "hidden",
            color: "#fff",
            fontFamily: "Segoe UI, sans-serif",
            maxWidth: "800px",
            margin: "2rem auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
        }}>
            {/* LEFT SECTION */}
            <div style={{ backgroundColor: "#166534", padding: "1.5rem" }}>
                <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700" }}>
                    {flightInfo.iata || flightInfo.number}
                </h2>
                <p style={{ margin: "0.2rem 0 1rem", fontWeight: "500" }}>{airline.name}</p>

                <div style={{ marginBottom: "0.5rem" }}>
                    <div><strong>{departure.iata}</strong> <span style={{ opacity: 0.7 }}>({departure.airport})</span></div>
                    <div><strong>{arrival.iata}</strong> <span style={{ opacity: 0.7 }}>({arrival.airport})</span></div>
                </div>

                <div style={{
                    marginTop: "1rem",
                    backgroundColor: getStatusColor(flight_status),
                    color: "#0f172a",
                    fontWeight: "bold",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "6px",
                    display: "inline-block"
                }}>
                    {flight_status.charAt(0).toUpperCase() + flight_status.slice(1)}
                </div>
            </div>

            {/* DEPARTURE */}
            <div style={{ backgroundColor: "#1e3a2f", padding: "1.5rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{departure.airport}</h3>
                <p style={{ fontSize: "0.85rem", margin: "0 0 1rem", opacity: 0.8 }}>
                    Flight Departure Times<br />
                    {flight_date}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Scheduled</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {departure.scheduled ? new Date(departure.scheduled).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "N/A"} PST
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Actual</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {departure.actual ? new Date(departure.actual).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "N/A"} PST
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.9rem" }}>
                    <div>Terminal<br /><strong>{departure.terminal || "N/A"}</strong></div>
                    <div>Gate<br /><strong>{departure.gate || "N/A"}</strong></div>
                </div>
            </div>

            {/* ARRIVAL */}
            <div style={{ backgroundColor: "#1e3a2f", padding: "1.5rem" }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{arrival.airport}</h3>
                <p style={{ fontSize: "0.85rem", margin: "0 0 1rem", opacity: 0.8 }}>
                    Flight Arrival Times<br />
                    {flight_date}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Scheduled</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {arrival.scheduled ? new Date(arrival.scheduled).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "N/A"} JST
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Estimated</div>
                        <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                            {arrival.estimated ? new Date(arrival.estimated).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "N/A"} JST
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.9rem" }}>
                    <div>Terminal<br /><strong>{arrival.terminal || "N/A"}</strong></div>
                    <div>Gate<br /><strong>{arrival.gate || "N/A"}</strong></div>
                </div>
            </div>
        </div>
    );
}