const express = require("express");
const router = express.Router();
const USER = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const fetchUser = require("../middleware/fetchUser");
const SECRET_KEY = process.env.JWT_SECRET_KEY;

// Function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ user: { id: userId } }, SECRET_KEY, { expiresIn: "1h" });
};

// SignUp User Data API
router.post("/register", async (req, res) => {
  const { name, DOB, email, password } = req.body;
  console.log(req.body);
  if (!name || !DOB || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const preuser = await USER.isEmailTaken(email);
    if (preuser) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      const finalUser = new USER({
        name,
        DOB,
        email,
        password,
      });

      const storeUser = await finalUser.save();
      const authToken = generateToken(storeUser.id);
      return res.json({ success: true, authToken, User: storeUser });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login User API
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please provide email and password" });
  }

  try {
    const userlogin = await USER.findOne({ email });
    if (!userlogin) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, userlogin.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const authToken = generateToken(userlogin.id);
    return res.json({ success: true, authToken, user: userlogin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
