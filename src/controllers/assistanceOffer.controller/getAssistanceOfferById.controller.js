const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAssistanceOfferByIdController = async (req, res, next) => {
  try {
    const assistanceOffer = await AssistanceOffer.findById(req.params.id).populate('userId');
    if (!assistanceOffer) {
      return res
        .status(404)
        .json({ message: 'Assistance Offer not found' });
    } 
    return res
      .status(200)
      .json(assistanceOffer);
  } catch (error) {
    next(error);
  }
};

module.exports = getAssistanceOfferByIdController;
