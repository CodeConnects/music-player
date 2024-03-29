const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const user = new User(req.body);

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send({ message: "Existing username found", success: false });
    }
    else {
      await user.save();
      return res.status(200).send({ message: "User registered successfully", success: true });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message, success: false });
  }
});

router.post('/login', async (req, res) => {
  try {
    // lookup user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({ message: "User not found", success: false });
    }

    // compare passwords
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (validPassword) {
      const token = jwt.sign({ userID: user._id }, process.env.TOKEN_KEY, { expiresIn: '1d' });

      // send userID in token to client
      return res.status(200).send({ message: "Successfull login", success: true, data: token });
    }
    else {
      return res.status(400).send({ message: "Invalid password", success: false });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

router.post('/get-user-data', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userID);

    // remove password from user object before sending to front end
    user.password = undefined;
    return res.status(200).send({ message: "User data successfully retrieved", success: true, data: user });

  } catch (error) {
    return res.status(500).send({ message: error.message, success: false });
  }
});

module.exports = router;
