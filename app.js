import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { get } from "mongoose";
import Vehicle from "./models/Vehicle.js";
import { ownerBookings } from "./controllers/bookingController.js";

dotenv.config();

// connect DB
connectDB();

const app = express();
const ownerVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ owner: req.user._id });
    console.log("OWNER VEHICLES 👉", vehicles);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ownerVehicles();
app.use(
  cors({
    origin: "https://rental.tripkiya.com/",
    credentials: true,
  })
);


// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);
//something
// test route
app.get("/", (req, res) => {
  res.send("🚀 Rapido Backend Running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
