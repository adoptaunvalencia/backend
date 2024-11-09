const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');
const comproveDate = require('../../utils/comproveDate');
const fetchGeoCode = require('../../utils/fetchGeoCode');
const formatForURL = require('../../utils/formatForURL');

const createAssistanceOffer = async (req, res, next) => {
  const { title, description, expires, city, address, postalcode, lat, lon } = req.body;
  const { user } = req;
  let geocodeData;

  if (title && title.length  > 50) {
    return res.status(400).json({ message: 'Title must be 50 characters or less' })
  }
  if (description && description.length > 256) {
    return res.status(400).json({ message: 'Description must be 256 characters or less' })
  }

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
    const comproveExpire = comproveDate(expires);
    if (!comproveExpire) {
      return res.status(400).json({
        message: 'The expiration date must be at least 24 hours in the future.',
      });
    }

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
    return res.status(201).json({
      message: 'Assistance Offer successfully created',
      assistanceOffer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createAssistanceOffer;
