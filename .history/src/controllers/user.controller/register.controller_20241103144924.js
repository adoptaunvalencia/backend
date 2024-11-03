const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');

const RegisterController = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  try {
    const createUser = new User({ ...req.body, email });
    await createUser.save();
    const user = await User.findById({ _id: createUser._id });
    return res
      .status(200)
      .json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    next(error);
  }
};

module.exports = RegisterController;
