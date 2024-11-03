const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const LoginController = async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son obligatorios" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "No se ha encontrado usuario con este email" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {;
      res.status(400).json({ message: "Contraseña incorrecta" });
      return;
    };

    const payload = {
      _id: foundUser._id,
      roles: foundUser.roles
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    });

    res.status(200).json({ authToken });

  } catch (error) {
    next(error);
  }
};

module.exports = LoginController;