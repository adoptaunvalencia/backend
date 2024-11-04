const User = require('../../models/users-model/user.model.js');
const generateToken = require('../../utils/tokenGenerator');
const nodemailer = require('nodemailer');
require('dotenv').config();

const comproveToken = async (req, res, next) => {
  const { token } = req.params;
  try {
    const existToken = await User.findOne({ token });
    if (!existToken) {
      return res.status(400).json({ status: false });
    } else {
      return res.status(200).json({ status: true });
    }
  } catch (error) {
    next(error);
  }
};

// Controller function for handling password reset requests
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body; // Extract email from request body

    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const token = generateToken(); // Generate password reset token
    user.token = token; // Store token in user document
    await user.save();

    //SEN EMAIL

    res.status(201).json({ message: 'Code sent to your email.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { forgotPassword, comproveToken };
