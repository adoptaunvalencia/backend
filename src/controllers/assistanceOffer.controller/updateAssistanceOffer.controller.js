const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const updateAssistanceOfferController = async (req, res, next) => {
  try {
    const updateAssistanceOffer = await AssistanceOffer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true });

    if (!updateAssistanceOffer) {
      return res
        .status(404)
        .json({ message: 'Assistance Offer not found' });
    }
    return res
      .status(201)
      .json({ message: 'Assistance Offer successfully updated', updateAssistanceOffer });
  } catch (error) {
    next(error);
  }
}

module.exports = updateAssistanceOfferController;
