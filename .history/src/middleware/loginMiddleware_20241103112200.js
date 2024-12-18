const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users-model/user.model.js');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Look up the user in the database by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect password.' });
  }

  // Generate a JWT for the user if password matches
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // Send the generated token back to the client
  res.json({ token });
};

module.exports = loginUser;
