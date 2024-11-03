const User = require('../../models/users-model/user.model.js');
const generateToken = require('../../utils/tokenGenerator');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Function to send a password reset email
const sendResetEmail = (email, token, next) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email,                     
    subject: 'Password Reset Token',
    text: `Your password reset token is: ${token}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return next(error);
    }
  });
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

    sendResetEmail(email, token, next); // Send the reset email
    res.json({ message: 'Token sent to your email.' });
  } catch (error) {
    next(error); 
  }
};

module.exports = forgotPassword;
