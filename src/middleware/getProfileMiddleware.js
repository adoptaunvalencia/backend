const User = require('../models/users-model/user.model.js');
//! MIDDLEWARE NO SIRVE, NO ME DEVUELVE EL NEXT()
const getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile.', error });
  }
};

module.exports = getProfile;
