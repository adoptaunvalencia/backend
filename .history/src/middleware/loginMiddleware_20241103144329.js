const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users-model/user.model.js');
require('dotenv').config();

const loginUser = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const { password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!email || !password) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    } else if (!user) {
      return res.status(400).json({ message: 'User not found.' });
    } else next();
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
