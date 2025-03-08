const router = require('express').Router();
const Login = require('./user/Login');
const dotenv = require('dotenv');
dotenv.config();
const Register = require('./user/Register');
const WRegister = require('./worker/wregister');

const User = require('../model/user');
const jwt = require('jsonwebtoken');
//const getAIResponse = require("../chatBotapi/api");
const Wsignin = require("./worker/Wsignin");
const wData = require("../routes/worker/wData");
const  wCredentialsCheck = require("./worker/wCredentialsCheck");
const authMiddleware = require("./worker/authwData");
const auth2 = require("./worker/wAuth2");
const showData = require("./worker/showData");
//console.log("api key :" , process.env.GEMINI_API_KEY); Working well
const geminiResponse = require("./geminiResponse");
const WorkerCredential = require('../model/workerData');
router.get('/', (req, res) => {
  console.log("router working well");
})
router.post("/login", Login);
router.post("/register", Register);
router.post("/wregister", WRegister);

router.post("/wsignin", Wsignin);
//fetch worker data
router.post("/wData", authMiddleware, wData);
//gemini api
//router.post("/geminiapi", geminiapi);


router.get("/user", async (req, res) => {
  try {
    const token = req.cookies.token; // 🔥 Read token from cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // ✅ Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Make sure token cookie is cleared
  res.status(200).json({ message: "Logged out successfully" });
});
//ai integration
//router.post('/chat', getAIResponse);

//chat application
//handle gemini api request :ROUTE
router.post("/chat", geminiResponse);

//worker credentials form request

router.post("/workerCredentials", auth2,  wCredentialsCheck);
router.get("/showData",auth2 ,showData);

module.exports = router;