const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/users-model/user.model');

const LoginController = async (req, res, next) => {

  const email = req.body.email.toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "User not found with that email" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {;
      res.status(400).json({ message: "Wrong password" });
      return;
    };

    const payload = {
      _id: foundUser._id,
      roles: foundUser.roles
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    });

    res.status(200).json({ authToken });

  } catch (error) {
    next(error);
  }
};

module.exports = LoginController;