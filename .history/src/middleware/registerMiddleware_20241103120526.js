const User = require('../models/users-model/user.model.js');

const registerUser = async (req, res, next) => {
  const email = req.body.email.toLowerCase()

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use.' });
  }else next()
};

module.exports = registerUser;
