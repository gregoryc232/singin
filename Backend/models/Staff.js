import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    warehouse: {
      type: String,
      enum: [
        "Azi's Global Container Freight Station (CFS)",
        "Azi's Global Landing Drive",
        "Azi's Global Wellington",
      ],
      required: true,
    },
    staffId: { type: String, required: true, unique: true },
    signInTime: { type: Date, default: Date.now },
    signOutTime: { type: Date },

  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);
