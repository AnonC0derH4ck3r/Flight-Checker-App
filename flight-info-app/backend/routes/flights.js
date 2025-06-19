import express from "express";
import dotenv from "dotenv";
import { DateTime } from "luxon";

dotenv.config();

const router = express.Router();
const BASE_URL = "http://api.aviationstack.com/v1";

const getTimezone = async (iata) => {
    const res = await fetch(`${BASE_URL}/airports?access_key=${process.env.AVIATIONSTACK_API_KEY}&iata_code=${iata}`);
    const data = await res.json();
    return data?.data?.[0]?.timezone || null;
};

const convertToLocalTime = (isoTime, zone) => {
    if (!isoTime || !zone) return "N/A";
    return DateTime.fromISO(isoTime, { zone: "utc" })
        .setZone(zone)
        .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);
};

router.get("/", async (req, res) => {
    const flightCode = req.query.code;
    if (!flightCode) {
        return res.status(400).json({ error: "Missing flight code" });
    }

    try {
        const flightRes = await fetch(`${BASE_URL}/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}&flight_iata=${encodeURIComponent(flightCode)}`);
        const flightData = await flightRes.json();

        if (!flightData?.data?.length) {
            return res.status(404).json({ error: "Flight not found" });
        }

        const flight = flightData.data[0];

        const depTZ = await getTimezone(flight.departure.iata);
        const arrTZ = await getTimezone(flight.arrival.iata);

        const localDepartureTime = convertToLocalTime(flight.departure.scheduled, depTZ);
        const localArrivalTime = convertToLocalTime(flight.arrival.scheduled, arrTZ);

        const result = {
            ...flight,
            localDepartureTime,
            localArrivalTime,
            departureTimezone: depTZ,
            arrivalTimezone: arrTZ,
        };

        res.json(result);
    } catch (err) {
        console.error("Error fetching flight info:", err);
        res.status(500).json({ error: "Failed to fetch flight data" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const flightRes = await fetch(`${BASE_URL}/flights?access_key=${process.env.AVIATIONSTACK_API_KEY}`);
        const flightData = await flightRes.json();

        if (!flightData?.data?.length) {
            return res.status(404).json({ error: "No flights found" });
        }

        const enrichedFlights = await Promise.all(flightData.data.map(async (flight) => {
            const depTZ = await getTimezone(flight.departure.iata);
            const arrTZ = await getTimezone(flight.arrival.iata);

            const localDepartureTime = convertToLocalTime(flight.departure.scheduled, depTZ);
            const localArrivalTime = convertToLocalTime(flight.arrival.scheduled, arrTZ);

            return {
                ...flight,
                localDepartureTime,
                localArrivalTime,
                departureTimezone: depTZ,
                arrivalTimezone: arrTZ
            };
        }));

        res.json(enrichedFlights);
    } catch (err) {
        console.error("Error fetching all flights:", err);
        res.status(500).json({ error: "Failed to fetch flights" });
    }
});

export default router;