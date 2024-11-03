const User = require('../models/users-model/user.model.js');
const { verifyToken } = require('../config/jwt.js');

const authenticateUser = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required.' });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }

  let user;
  try {
    user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Database error.', error: error.message });
  }

  req.user = user;
  next();
};

module.exports = authenticateUser;
