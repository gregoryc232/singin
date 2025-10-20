import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Staff from "./models/Staff.js";

dotenv.config();

const results = [];

fs.createReadStream("staff.csv")
  .pipe(csv())
  .on("data", (data) => {
    results.push({
      name: data.name,
      warehouse: data.warehouse || data.Warehouse,
      staffId: data.staffId || data.staffID,
    });
  })
  .on("end", async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ Connected to MongoDB");

      let updatedCount = 0;
      let insertedCount = 0;

      for (const record of results) {
        const existing = await Staff.findOne({ staffId: record.staffId });

        if (existing) {
          // update record
          await Staff.updateOne(
            { staffId: record.staffId },
            { $set: { name: record.name, warehouse: record.warehouse } }
          );
          updatedCount++;
        } else {
          // insert new record
          await Staff.create(record);
          insertedCount++;
        }
      }

      console.log(
        `✅ Import complete: ${insertedCount} added, ${updatedCount} updated.`
      );
      mongoose.connection.close();
    } catch (err) {
      console.error("❌ Import failed:", err.message);
      mongoose.connection.close();
    }
  });
