const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users-model/user.model');
const { generateJWT } = require('../../config/jwt');

const LoginController = async (req, res, next) => {
  const { user, password } = req.body;
  try {
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateJWT(user._id);
      const user = await getUserWithPopulates(req.user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(409).json({ message: 'Invalida password.' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = LoginController;
