const mongoose = require("mongoose");

const WorkerCredentialSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  workExperience: [
    {
      company: { type: String, required: true },
      role: { type: String, required: true },
      years: { type: Number, required: true },
    },
  ],
  workHours: {
    startTime: { type: String, required: true }, // e.g., "09:00 AM"
    endTime: { type: String, required: true },   // e.g., "06:00 PM"
  },
  govtCertifications: [
    {
      name: { type: String, }, // e.g., "Electrician License"
      fileUrl: { type: String, }, // Cloud storage URL
      issuedBy: { type: String, },
      issueDate: { type: Date, },
    },
  ],
  paymentRange: {
    minRate: { type: Number, required: true }, // Minimum rate (INR/hour)
    maxRate: { type: Number, required: true }, // Maximum rate (INR/hour)
  },
  
  location: {
    type: String,
    required: true, // 🔹 Store City/State
  },
  coordinates: {
    type: { type: String, enum: ["Point"], default: "Point" }, // 🔹 GeoJSON format
    coordinates: { type: [Number], required: true, index: "2dsphere" }, // [longitude, latitude]
  },

}, { timestamps: true });

const WorkerCredential = mongoose.model("WorkerCredential", WorkerCredentialSchema);
module.exports = WorkerCredential;
