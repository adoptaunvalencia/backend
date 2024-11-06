const User = require('../../models/users-model/user.model');

const getAssistanceOfferByIdController = async (req, res, next) => {
  const { user, assistance, isAuth } = req;
  try {
    const userInfo = await User.findById(user._id).select(
      isAuth ? '-password' : 'lat lon'
    );

    const assistanceOfferWithUserInfo = {
      ...assistance.toObject(),
      user: userInfo.toObject(),
    };

    return res
      .status(200)
      .json({ assistanceOffer: assistanceOfferWithUserInfo })
  } catch (error) {
    next(error);
  }
};

module.exports = getAssistanceOfferByIdController;
