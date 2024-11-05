const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const createAssistanceOfferController = async (req, res, next) => {
  try {
    const createAssistanceOffer = new AssistanceOffer(req.body);
    await createAssistanceOffer.save();
    const assistanceOffer = await AssistanceOffer.findById({ _id: createAssistanceOffer._id });
    return res
      .status(201)
      .json({ message: 'Assistance Offer successfully created', assistanceOffer})
  } catch (error) {
    next(error);
  }
};

module.exports = createAssistanceOfferController;
