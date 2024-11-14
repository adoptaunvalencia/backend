const User = require('../../models/users-model/user.model');

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userById = await User.findById(id).select('email');
    if (!userById) {
      return res
        .status(404)
        .json({ message: 'User not found' });
    }

    return res
      .status(200)
      .json(userById)
  } catch (error) {
    next(error);
    console.log(error)
  }
};

module.exports = getUserById;
