const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');
const emailWelcome = require('./mails/emailWelcome');
const formatForURL = require('../../utils/formatForURL');
const fetchGeoCode = require('../../utils/fetchGeoCode');

const GEO_API_KEY = process.env.GEO_API_KEY;
const RegisterController = async (req, res, next) => {
  const { city, address, postalcode } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    // FETCH GEOCODE
    const newCity = formatForURL(city);
    const newAddress = formatForURL(address);
    const newPC = formatForURL(postalcode);

    const geocodeData = await fetchGeoCode(
      newAddress,
      newCity,
      newPC,
      GEO_API_KEY,
    );
    if (!geocodeData) {
      return res
        .status(400)
        .json({
          message:
            'Unable to fetch geolocation data. Please check the address information and try again.',
        });
    }
    const createUser = new User({
      ...req.body,
      email,
      lat: geocodeData[0].lat,
      lon: geocodeData[0].lon,
    });
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
