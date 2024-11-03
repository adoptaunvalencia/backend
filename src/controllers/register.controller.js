const bcrypt = require('bcrypt');
const User = require('../models/User');

const RegisterController = async (req, res, next) => {

  const { name, lastname, email, password, age } = req.body;

  if (!name || !lastname || !email || !password || !age) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  };

  const regexPassword = /^.{8,}$/gm;
  if (regexPassword.test(password) === false) {
    res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres" })
    return
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Este correo ya está registrado" });
      return;
    };

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt)

    await User.create({
      name,
      lastname,
      email,
      password: hashPassword,
      age
    });

    res.status(201).json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    next(error);
  }
};

module.exports = RegisterController;