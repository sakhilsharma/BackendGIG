const express = require("express");
const router = express.Router();


// Send Message
const send = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const newMessage = new Message({ senderId, receiverId, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Messages between two users
const worker =  async (req, res) => {
  try {
    const { userId, workerId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: workerId },
        { senderId: workerId, receiverId: userId },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {send, worker};
