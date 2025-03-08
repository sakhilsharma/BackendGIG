const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
console.log("secret key ",SECRET_KEY);
const auth2 = (req, res, next) => {
    // ✅ Extract token from cookies
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        // ✅ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log("Decoded Token:", decoded);

        // ✅ Attach worker ID to req.body
        req.body.workerId = decoded.id;
        console.log(req.body.workerId)

        next(); // ✅ Proceed to next middleware/controller
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = auth2;
