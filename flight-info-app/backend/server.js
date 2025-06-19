import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flightRoutes from "./routes/flights.js";

dotenv.config();

const app = express();
app.use(cors());

app.use("/api/flight", flightRoutes);

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});