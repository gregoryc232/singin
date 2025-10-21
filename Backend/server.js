import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import API routes
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import visitorRoutes from "./routes/visitor.js";
import staffRoutes from "./routes/staff.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/staff", staffRoutes);

// ✅ Serve frontend static files
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// ✅ Serve home.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "/singin/Frontend/home.html"));
});

// ✅ Handle all other frontend routes safely (Express 5 fix)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "/singin/Frontend/home.html"));
});


// ✅ Serve home.html as the root
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "/singin/Frontend/home.html"));
});

// ✅ Handle 404 fallback to home.html (optional for SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "/singin/Frontend/home.html"));
});

// ✅ Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!mongoUri) {
  console.error("❌ MONGO_URI missing. Check your Render Environment Variables.");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
