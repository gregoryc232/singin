import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import visitorRoutes from "./routes/visitor.js";
import staffRoutes from "./routes/staff.js";



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/staff", staffRoutes);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;

try {
  await mongoose.connect(mongoUri);
  console.log("✅ Connected to MongoDB Atlas");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
} catch (err) {
  console.error("❌ MongoDB connection failed:", err.message);
}
