const User = require('../../models/users-model/user.model');
const AssistanceOffer = require('../../models/assistance-offer-model/assistanceOffer.model');

const getAllAssistanceOffersController = async (req, res, next) => {
  const { isAuth } = req;
  try {
    let query = AssistanceOffer.find();
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

/**
 * //! KIKE ESTO NO SE HACE
 * 
 * try {
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
 */
