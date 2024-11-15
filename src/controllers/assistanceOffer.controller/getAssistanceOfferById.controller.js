const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAssistanceOffer = async (req, res, next) => {
  const { isAuth } = req;
  const { id } = req.params;
  try {
    let query = AssistanceOffer.findById(id);

    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select: '-password -email',
      });
    }

    const AssistanceOfferById = await query;

    if (!AssistanceOfferById) {
      return res
        .status(404)
        .json({ message: 'Assistance Offer not found' });
    }

    return res
      .status(200)
      .json(AssistanceOfferById)
  } catch (error) {
    next(error);
  }
};

module.exports = getAssistanceOffer;
