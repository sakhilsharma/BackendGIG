const bcrypt = require('bcrypt')
const User = require('../../model/user'); 
console.log("Register working");    
const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({
            name:name,
            email:email,
            password:hashedPassword,
        });

        // Save user to the database
        await user.save();

        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}
module.exports = Register;