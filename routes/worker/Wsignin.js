const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Worker = require('../../model/worker'); // Adjust the path as necessary

console.log("Login working");
// Login function
const Wsignin = async (req, res) => {
    const { email, password } = req.body;
    console.log("worker signin", email, password);
    try {
        // Check if user exists
        const user = await Worker.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, "jjjjeeee5555", { expiresIn: '1h' });
        // Store token in an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure in production
            sameSite: "lax",  // Ensures it works across domains
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = Wsignin;