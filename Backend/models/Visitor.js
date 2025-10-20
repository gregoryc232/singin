import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    email: { type: String },
    host: { type: String, required: true }, // who they’re visiting
    purpose: { type: String },
    signInTime: { type: Date, default: Date.now },
    signOutTime: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
