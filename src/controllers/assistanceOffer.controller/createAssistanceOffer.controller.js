const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');
const comproveDate = require('../../utils/comproveDate');
const fetchGeoCode = require('../../utils/fetchGeoCode');
const formatForURL = require('../../utils/formatForURL');

const createAssistanceOffer = async (req, res, next) => {
  const { expires, city, address, postalcode, lat, lon } = req.body;
  const { user } = req;
  let geocodeData;

  try {
    if (!lat || !lon) {
      const newCity = formatForURL(city);
      const newAddress = formatForURL(address);
      const newPC = formatForURL(postalcode);
      geocodeData = await fetchGeoCode(newAddress, newCity, newPC);
      if (!geocodeData) {
        return res.status(400).json({
          message:
            'Unable to fetch geolocation data. Please check the address information and try again.',
        });
      }
    }
    /* const comproveExpire = comproveDate(expires);
    if (!comproveExpire) {
      return res.status(400).json({
        message: 'The expiration date must be at least 24 hours in the future.',
      });
    } */

    const location = {
      type: 'Point',
      coordinates: [lon || geocodeData[0].lon, lat || geocodeData[0].lat],
    };

    const assistanceOffer = new AssistanceOffer({
      ...req.body,
      userId: user._id,
      location,
    });
    await assistanceOffer.save();
    const offer = await AssistanceOffer.findById(assistanceOffer._id).populate({
      path: 'userId',
      select: '-password -lastname -email -birthDate -city -address -postalcode -roles -lat -lon',
    });
    return res.status(201).json({
      message: 'Assistance Offer successfully created',
      offers:offer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createAssistanceOffer;
