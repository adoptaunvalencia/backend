const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users-model/user.model.js');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;
  const user = await User.findOne({ email });

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  } else if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  } else next();
};

module.exports = loginUser;
