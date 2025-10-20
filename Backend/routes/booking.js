import express from "express";
import Booking from "../models/Bookings.js";

const router = express.Router();

// Create a booking
router.post("/", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ msg: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
