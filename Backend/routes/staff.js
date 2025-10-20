import express from "express";
import Staff from "../models/Staff.js";

const router = express.Router();

/**
 * ✅ Sign in staff
 * - Updates existing record or creates new one
 * - Prevents multiple sign-ins without sign-out
 */
router.post("/signin", async (req, res) => {
  try {
    const { name, warehouse, staffId } = req.body;

    // Ensure all fields are provided
    if (!name || !warehouse || !staffId) {
      return res.status(400).json({ msg: "All fields are required." });
    }

    // Check if staff is already signed in
    const existingActive = await Staff.findOne({ staffId, signOutTime: null });
    if (existingActive) {
      return res.status(400).json({ msg: "Staff already signed in." });
    }

    // Either create a new record or update an existing staff entry
    const staff = await Staff.findOneAndUpdate(
      { staffId },
      { name, warehouse, signInTime: new Date(), signOutTime: null },
      { new: true, upsert: true } // Upsert prevents duplicate key error
    );

    res.json({ msg: "✅ Staff signed in successfully", staff });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Sign out staff
 */
router.put("/signout/:staffId", async (req, res) => {
  try {
    const staff = await Staff.findOneAndUpdate(
      { staffId: req.params.staffId, signOutTime: null },
      { signOutTime: new Date() },
      { new: true }
    );

    if (!staff) {
      return res
        .status(404)
        .json({ msg: "Staff not found or already signed out." });
    }

    res.json({ msg: "✅ Staff signed out", staff });
  } catch (err) {
    console.error("Sign-out error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Get all staff (latest first)
 */
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find().sort({ signInTime: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Get currently signed-in staff
 */
router.get("/active", async (req, res) => {
  try {
    const activeStaff = await Staff.find({ signOutTime: null });
    res.json(activeStaff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ✅ Get staff by warehouse
 * - Used for dropdown filtering on the frontend
 */
router.get("/warehouse/:warehouse", async (req, res) => {
  try {
    const warehouse = decodeURIComponent(req.params.warehouse);
    const staff = await Staff.find({ warehouse }).sort({ name: 1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
