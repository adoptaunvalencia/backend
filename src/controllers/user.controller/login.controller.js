const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users-model/user.model');
const { generateJWT } = require('../../config/jwt');

const LoginController = async (req, res, next) => {
  const { password } = req.body;
  const { user } = req;
  try {
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateJWT(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(409).json({ message: 'Invalid password.' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = LoginController;
