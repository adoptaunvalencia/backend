const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const deleteAssistanceOffer = async (req, res, next) => {
  try {
    const deleteAssistanceOffer = await AssistanceOffer.findByIdAndDelete(req.params.id);
    if (!deleteAssistanceOffer) {
      return res
        .status(404)
        .json({ message: 'Assistance Offer not found' });
    }
    return res
      .status(204)
      .json({ message: 'Assistance Offer successfully deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = deleteAssistanceOffer;
