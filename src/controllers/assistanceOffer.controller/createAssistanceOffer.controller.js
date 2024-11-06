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
      location
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


/**
 * {
	"message": "Assistance Offer successfully created",
	"assistanceOffer": {
		"title": "UPDATE 2 🤣",
		"description": "Tengo dispolnible una habitación para dormir.",
		"status": true,
		"userId": "672953991f7f64ac65037a94",
		"expires": "2024-11-08T00:00:00.000Z",
		"img": "https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg",
		"city": "Alicante",
		"address": "Pasaje metal 7, 5-A",
		"postalcode": "03006",
		"location": {
			"type": "Point",
			"coordinates": [
				-0.504228,
				38.3451509
			]
		},
		"typeOffer": "hygiene",
		"_id": "672b6ee54a12419c5498cc27",
		"createdAt": "2024-11-06T13:28:05.109Z",
		"updatedAt": "2024-11-06T13:28:05.109Z",
		"__v": 0
	}
}
 */