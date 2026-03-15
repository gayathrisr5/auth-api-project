const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const user = require("../models/user");

const router = express.Router();

// SignUP
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const existingUser = await user.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }

    // password length validation
    if (password.length < 5) {
      return res.status(400).json({
        message: "Password must be at least 5 characters",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(200).json({
      message: "user registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SignIn
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const User = await user.findOne({ username });

    if (!User) {
      return res.status(404).json({
        message: "Incorrect credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, User.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect Credentials",
      });
    }

    // generate random token of length 64
    const token = crypto.randomBytes(32).toString("hex");

    res.json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
