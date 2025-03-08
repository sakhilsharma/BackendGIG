const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token; // ✅ Get token from cookies
    console.log(token); // Check if token is present

    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        // ✅ Store both id and email in req.user
        req.user = { id: decoded.id};
        console.log(req.user.id);

        next();
    } catch (error) {
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
