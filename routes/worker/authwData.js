const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token; // ✅ Get token from cookies
  console.log(token); //check first kya token aya hai
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { email: decoded.email }; // ✅ Attach user email to request
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
