const bcrypt = require('bcrypt');

const putPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body; // Extract token and new password from request body
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Encrypt the new password and save it to the user document
    user.password = await bcrypt.hash(newPassword, 10);
    user.token = null; // Delete the token from the user document
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = putPassword;
