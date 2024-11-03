const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users-model/user.model');

const LoginController = async (req, res, next) => {
  const { password } = req.body;
  try {
    if (bcrypt.compareSync(password, req.user.password)) {
      const token = generateJWT(req.user._id);
      const user = await getUserWithPopulates(req.user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(409).json({ message: 'Contraseña incorrecta.' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = LoginController;
