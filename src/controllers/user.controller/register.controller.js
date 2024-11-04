const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');
const emailWelcome = require('./mails/emailWelcome');

const RegisterController = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  try {
    //https://geocode.maps.co/search?street=pasaje+metal+7&city=Alicante&postalcode=03006&api_key=67293a25d020e598630844wila1c45a
    const createUser = new User({ ...req.body, email });
    await createUser.save();
    await emailWelcome(createUser);
    const user = await User.findById({ _id: createUser._id });
    return res
      .status(201)
      .json({ message: 'User successfully created.', user });
  } catch (error) {
    next(error);
  }
};

module.exports = RegisterController;
