const User = require('../models/users-model/user.model.js');
const { verifyToken } = require('../config/jwt');
const config = require('../config/config.env.js');

const authenticateUser = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }
  try {
    const decode = verifyToken(token, config.jwtSecret);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(401).json({
        message: 'User not exist.',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;
