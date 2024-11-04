const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');

const putPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body; // Extract token and new password from request body
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Encrypt the new password and save it to the user document
    user.password = password;
    user.token = ''; // Delete the token from the user document
    await user.save();
    res.json({ message: 'Password updated successfully.', user });
  } catch (error) {
    next(error);
  }
};

module.exports = putPassword;
