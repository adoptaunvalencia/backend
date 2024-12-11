const User = require('../models/users-model/user.model.js');

const registerUser = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const { name, lastname, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  } else if (existingUser) {
    return res.status(400).json({ message: 'Email already in use.' });
  } else {
    next();
  }
};

module.exports = registerUser;
