const WorkerCredential = require("../../model/workerData");
const funda = async (req, res) => {
    try {
        const { workExperience, workHours, govtCertifications, paymentRange , location, coordinates } = req.body;
        const workerId = req.body.workerId; // ✅ Extracted from token

        // ✅ Check if credentials already exist for the worker
        let existingCredentials = await WorkerCredential.findOne({ workerId });
        if (existingCredentials) {
            return res.status(400).json({ error: "Credentials already exist for this worker" });
        }
        if (!location) {
            return res.status(400).json({ error: "Location is required" });
          }
      
          if (!coordinates || !Array.isArray(coordinates.coordinates) || coordinates.coordinates.length !== 2) {
            return res.status(400).json({ error: "Coordinates must have [longitude, latitude]" });
          }

        // ✅ Create new worker credentials
        const newCredentials = new WorkerCredential({
            workerId:workerId,
            workExperience: workExperience,
            workHours: workHours,
            govtCertifications:govtCertifications,
            paymentRange:paymentRange,
            location: location,
            coordinates: coordinates
        });

        await newCredentials.save();
        res.status(201).json({ message: "Worker credentials saved successfully!", data: newCredentials });
    } catch (error) {
        console.error("Error saving worker credentials:", error);
        res.status(500).json({ error: "Server error" });
    }
}
module.exports = funda;