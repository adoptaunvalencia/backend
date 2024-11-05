const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffersController = async (req, res, next) => {
  try {
    const assistanceOffers = await AssistanceOffer.find().populate('userId');
    return res
      .status(200)
      .json({ assistanceOffers });
  } catch (error) {
    next(error);
  }
}

module.exports = getAllAssistanceOffersController;
