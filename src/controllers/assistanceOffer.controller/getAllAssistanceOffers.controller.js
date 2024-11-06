const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffersController = async (req, res, next) => {
  try {
    const assistanceOffers = await AssistanceOffer.find({});
    
    const assistanceOffersWithUserInfo = await Promise.all(
      assistanceOffers.map(async (offer) => {
        const user = await User.findById(offer.userId).select(
          req.isAuth ? '-password' : 'lat lon'
        );

        return {
          ...offer.toObject(),
          user: user.toObject(),
        };
      })
    );

    return res.status(200).json({ assistanceOffers: assistanceOffersWithUserInfo });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllAssistanceOffersController;
