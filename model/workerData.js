// models/WorkerExperience.js
const mongoose = require("mongoose");

const WorkerExperienceSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker",
    required: true,
  },
  workExperience: {
    type: String, // Example: "5 years in plumbing"
    required: true,
  },
  paymentRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  workHours: {
    start: { type: String, required: true }, // Example: "09:00 AM"
    end: { type: String, required: true }, // Example: "06:00 PM"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
WorkerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const WorkerExperience = mongoose.model("WorkerExperience", WorkerExperienceSchema);
module.exports = WorkerExperience;
