const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');
const comproveDate = require('../../utils/comproveDate');
const { deleteImg } = require('../../utils/deleteAvatar');
const fetchGeoCode = require('../../utils/fetchGeoCode');
const formatForURL = require('../../utils/formatForURL');

const updateAssistanceOffer = async (req, res, next) => {
  const { id } = req.params;
  const { status, city, address, postalcode, lat, lon } = req.body;
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
    const assistanceOffer = await AssistanceOffer.findById(id);

    if (!assistanceOffer) {
      return res.status(404).json({
        message: 'Assistance offer not found',
      });
    }

    if (assistanceOffer.userId.toString() !== user._id.toString()) {
      return res.status(403).json({
        message: 'You are not authorized to update this assistance offer.',
      });
    }    
    assistanceOffer.set({
      ...req.body,
      userId: user._id,
      lat: lat || geocodeData[0].lat,
      lon: lon || geocodeData[0].lon,
    });

    await assistanceOffer.save();
    return res.status(200).json({
      message: 'Assistance Offer successfully updated',
      assistanceOffer,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAssistanceOffer;
