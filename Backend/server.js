import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import visitorRoutes from "./routes/visitor.js";
import staffRoutes from "./routes/staff.js";

// Setup
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/staff", staffRoutes);

// --- FRONTEND DEPLOYMENT SETUP ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../Frontend")));

// Catch-all to serve index.html for any unrecognized route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// --- DATABASE CONNECTION ---
try {
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB Atlas");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
} catch (err) {
  console.error("❌ MongoDB connection failed:", err.message);
}
