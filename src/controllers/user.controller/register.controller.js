const bcrypt = require('bcrypt');
const User = require('../../models/users-model/user.model');
const emailWelcome = require('./mails/emailWelcome');

const formatForURL = (string) => {
  console.log(string);

  return string.replace(/ /g, '+');
};

const GEO_API_KEY = process.env.GEO_API_KEY;
const RegisterController = async (req, res, next) => {
  const { city, address, postalcode } = req.body;
  const email = req.body.email.toLowerCase();
  try {
    const createUser = new User({ ...req.body, email });
    // FETCH GEOCODE
    const newCity = formatForURL(city);
    const newAddress = formatForURL(address);
    const newPC = formatForURL(postalcode);
    const GEO_URI = `https://geocode.maps.co/search?street=${newAddress}&city=${newCity}&postalcode=${newPC}&api_key=${GEO_API_KEY}`;
    const response = await fetch(GEO_URI);
    const data = await response.json();
    // END FETCH GEOCODE
    if (!data || data.length === 0) {
      createUser.lat = null;
      createUser.lon = null;
    } else {
      createUser.lat = data[0]?.lat;
      createUser.lon = data[0]?.lon;
    }
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
