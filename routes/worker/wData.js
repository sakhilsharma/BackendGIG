const Worker = require("../../model/worker");

const wData = async (req, res) => {
    try {
        console.log("Request User Data:", req.user); // Debugging Log

        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "Invalid user session" });
        }

        // ✅ Fetch Worker by ID (instead of email)
        const worker = await Worker.findById(req.user.id).select("-password");

        if (!worker) {
            return res.status(404).json({ message: "Worker not found" });
        }

        console.log("Fetched Worker Data:", worker);
        res.json(worker);
    } catch (error) {
        console.error("Error fetching worker data:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = wData;
