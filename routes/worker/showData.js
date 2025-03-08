const WorkerCredential = require("../../model/workerData");
const showData = async(req, res) => {
    try {
        const workerId = req.body.workerId; // ✅ Worker ID extracted from token

        // ✅ Fetch worker credentials from database
        const workerCredentials = await WorkerCredential.findOne({ workerId });

        if (!workerCredentials) {
            return res.status(404).json({ error: "No credentials found for this worker" });
        }

        res.status(200).json(workerCredentials);
    } catch (error) {
        console.error("Error fetching worker credentials:", error);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = showData;