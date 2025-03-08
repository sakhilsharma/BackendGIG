const mongoose = require("mongoose");
const Worker = require("../model/worker"); // Import the Worker model
const { ObjectId } = mongoose.Types; // Generate MongoDB ObjectIDs

// 🔹 Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/gigconnect").then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// 🔹 Generate 10-15 Worker Entries (Random Locations in Himachal Pradesh)
const workers = [
  {
    
    name: "Sakhil Sharma",
    email: "sakhilsharma123@gmail.com",
    password: "$2b$10$S9JkUWuqcchP/dSB4t4gruKEP8V99V03jvJASCNxO01c658HFfbsO",
    phone: 7876374598,
    profession: "Plumber",
    skills: ["leak fixes", "pipe installations"],
    hourlyRate: 600,
    location: "Hamirpur, Himachal Pradesh",
    coordinates: { type: "Point", coordinates: [76.5203, 31.6846] }
  },
  {
    
    name: "Sakhil Sharma",
    email: "sakhilsharma123@gmail.com",
    password: "$2b$10$S9JkUWuqcchP/dSB4t4gruKEP8V99V03jvJASCNxO01c658HFfbsO",
    phone: 7876374598,
    profession: "Plumber",
    skills: ["leak fixes", "pipe installations"],
    hourlyRate: 600,
    location: "Una, Himachal Pradesh",
    coordinates: { type: "Point", coordinates: [76.2816, 31.4696] }
  },
  {
    
    name: "Sakhil Sharma",
    email: "sakhilsharma123@gmail.com",
    password: "$2b$10$S9JkUWuqcchP/dSB4t4gruKEP8V99V03jvJASCNxO01c658HFfbsO",
    phone: 7876374598,
    profession: "Plumber",
    skills: ["leak fixes", "pipe installations"],
    hourlyRate: 600,
    location: "Kangra, Himachal Pradesh",
    coordinates: { type: "Point", coordinates: [76.2711, 32.0998] }
  },
  {
   
    name: "Sakhil Sharma",
    email: "sakhilsharma123@gmail.com",
    password: "$2b$10$S9JkUWuqcchP/dSB4t4gruKEP8V99V03jvJASCNxO01c658HFfbsO",
    phone: 7876374598,
    profession: "Plumber",
    skills: ["leak fixes", "pipe installations"],
    hourlyRate: 600,
    location: "Nadaun, Himachal Pradesh",
    coordinates: { type: "Point", coordinates: [76.3531, 31.7802] }
  }
];

// 🔹 Insert Workers into MongoDB
const insertWorkers = async () => {
  try {
    await Worker.insertMany(workers);
    console.log("✅ Workers added successfully!");
  } catch (error) {
    console.error("❌ Error inserting workers:", error);
  } finally {
    mongoose.connection.close();
  }
};

// 🔹 Run the function
insertWorkers();
