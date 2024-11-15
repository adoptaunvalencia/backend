const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAssistanceOffersByUser = async (req, res, next) => {
  const { user } = req;  
  try {
    const assistanceOffersByUser = await AssistanceOffer.find({ userId: user._id });

    if (!assistanceOffersByUser) {
      return res
        .status(404)
        .json({ message: 'Assistance Offer not found' });
    }

    return res
      .status(200)
      .json(assistanceOffersByUser);
  } catch (error) {
    next(error);
  }
}

module.exports = getAssistanceOffersByUser;
