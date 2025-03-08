const Worker = require("../../model/worker");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const WRegister = async (req, res) => {
    try {
        const { name, email, password, phone, profession, skills, hourlyRate } = req.body;
        console.log({ name, email, password, phone, profession, skills, hourlyRate });

        // Validate required fields
        if (!name || !email || !password || !phone || !profession || !skills || !hourlyRate) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email format" });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long" });
        }

        // Validate phone number (must be at least 10 digits)
        if (!/^\d{10,}$/.test(phone)) {
            return res.status(400).json({ msg: "Phone number must be at least 10 digits" });
        }

        // Check if worker already exists
        const workerExists = await Worker.findOne({ email });
        if (workerExists) {
            return res.status(400).json({ msg: "Worker already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure skills is an array
        const skillsArray = Array.isArray(skills) ? skills : skills.split(",").map(skill => skill.trim());

        // Create a new worker
        const newWorker = new Worker({
            name:name,
            email:email,
            password: hashedPassword,
            phone:phone,
            profession,
            skills: skillsArray,
            hourlyRate:hourlyRate
        });

        // Save worker to the database
        await newWorker.save();

        // Generate JWT
        const token = jwt.sign({ id: newWorker._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: '1h' });

        // Send response
        res.status(201).json({ msg: "Worker registered successfully", token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error registering worker" });
    }
};

module.exports = WRegister;
