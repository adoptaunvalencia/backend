const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffersController = async (req, res, next) => {
  const { isAuth } = req;
  try {
    let query = AssistanceOffer.find();
    // PAGINATIONS
    // FILTERS
    if (isAuth) {
      query = query.populate({
        path: 'userId',
        select: '-password -email',
      });
    }
    const offers = await query;
    return res.status(200).json({ assistancesOffers: offers });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllAssistanceOffersController;
