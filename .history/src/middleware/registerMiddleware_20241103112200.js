const User = require('../models/users-model/user.model.js');

const registerUser = async (req, res) => {
  const { name, lastname, email, password, age } = req.body;

  // Check if the email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use.' });
  }

  const newUser = new User({
    name,
    lastname,
    email,
    password,
    age,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user.', error });
  }
};

module.exports = registerUser;
