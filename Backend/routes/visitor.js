import express from "express";
import Visitor from "../models/Visitor.js";

const router = express.Router();

// Sign in a visitor
router.post("/signin", async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.json({ msg: "Visitor signed in", visitor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sign out a visitor
router.put("/signout/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { signOutTime: new Date() },
      { new: true }
    );
    res.json({ msg: "Visitor signed out", visitor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all visitors (optionally filter by active)
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a visitor
router.delete("/:id", async (req, res) => {
  try {
    const result = await Visitor.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ msg: "Visitor not found" });
    res.json({ msg: "Visitor removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

