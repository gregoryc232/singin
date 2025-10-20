import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String },
  notes: { type: String },
});

export default mongoose.model("Booking", bookingSchema);
