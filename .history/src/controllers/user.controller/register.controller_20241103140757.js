const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');

const RegisterController = async (req, res, next) => {

  const email = req.body.email.toLowerCase();
  const { name, lastname, password, age } = req.body;

  if (!name || !lastname || !email || !password || !age) {
    return res.status(400).json({ message: "All fields are required" });
  };

  const regexPassword = /^.{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json({ message: "The password must be at least 8 characters long" })
    return
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "This email is already registered" });
      return;
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      name,
      lastname,
      email,
      password: hashPassword,
      age
    });

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    next(error);
  }
};

module.exports = RegisterController;