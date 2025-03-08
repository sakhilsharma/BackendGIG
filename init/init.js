const mongoose = require("mongoose");
const WorkerCredential = require("../model/workerData"); // Import your model
const { ObjectId } = mongoose.Types; // Generate MongoDB ObjectIDs

// 🔹 MongoDB Connection
mongoose.connect("mongodb://localhost:27017/gigconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 🔹 15 Worker Data Entries
const workers = [
  {
    workerId: new ObjectId(), // 🔹 Assign a unique MongoDB ObjectId
    workExperience: [{ company: "ABC Plumbing Services", role: "Plumber", years: 5, _id: new ObjectId() }],
    workHours: { startTime: "08:00 AM", endTime: "06:00 PM" },
    govtCertifications: [{ name: "Plumbing Certification", fileUrl: "https://certs.com/plumber1.pdf", issuedBy: "Govt of India", issueDate: "2019-05-10", _id: new ObjectId() }],
    paymentRange: { minRate: 500, maxRate: 1200 },
    location: "Delhi",
    coordinates: { type: "Point", coordinates: [77.1025, 28.7041] }
  },
  {
    workerId: new ObjectId(),
    workExperience: [{ company: "XYZ Electricals", role: "Electrician", years: 3, _id: new ObjectId() }],
    workHours: { startTime: "09:00 AM", endTime: "07:00 PM" },
    govtCertifications: [], // Uncertified Worker
    paymentRange: { minRate: 600, maxRate: 1400 },
    location: "Mumbai",
    coordinates: { type: "Point", coordinates: [72.8777, 19.076] }
  },
  {
    workerId: new ObjectId(),
    workExperience: [{ company: "National Institute of Technology (NIT) Hamirpur", role: "Plumber", years: 3, _id: new ObjectId() }],
    workHours: { startTime: "09:00 AM", endTime: "06:00 PM" },
    govtCertifications: [{ name: "Plumber Certification", fileUrl: "https://certs.com/plumber2.pdf", issuedBy: "Govt of India", issueDate: "2020-10-10", _id: new ObjectId() }],
    paymentRange: { minRate: 800, maxRate: 1200 },
    location: "KULLU",
    coordinates: { type: "Point", coordinates: [77.1089232, 31.9578974] }
  }
];

// 🔹 Bulk Insert Function
const insertWorkers = async () => {
  try {
    await WorkerCredential.insertMany(workers);
    console.log("✅ Workers added successfully!");
  } catch (error) {
    console.error("❌ Error inserting workers:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after operation
  }
};

// 🔹 Run the function
insertWorkers();
