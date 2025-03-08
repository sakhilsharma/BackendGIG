const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    hourlyRate: {
        type: Number,
        required: true,
    },
});

const Worker = mongoose.model("Worker", WorkerSchema);

module.exports = Worker;
