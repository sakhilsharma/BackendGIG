const express = require('express');
const app = express();
//parses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
app.use(cookieParser());
dotenv.config(); // Load the .env file
//console.log("JWT_SECRET:", process.env.JWT_SECRET);
//cors 
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:8080', // Adjust based on your frontend port
    credentials: true
}));

//mongoose
const mongoose = require('mongoose');
const main = async () => {
    (await mongoose.connect('mongodb://127.0.0.1:27017/GigConnect'))
}
const SECRET_KEY = process.env.JWT_SECRET || "jjjjeeee5555";
main().then((res) => console.log(res)).catch((err) => console.log(err));
//env variables
const port = process.env.PORT || 5000


//missleware to verify token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        // Verify JWT Token
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};



app.listen(port, (req, res) => {
    console.log(`server running at the ${port} `)
})
app.get('/', authMiddleware, (req, res) => {
    res.status(200).json({ message: "This is working site" })
})
const userRoutes = require("./routes/context");
app.use('/api/context', userRoutes)
