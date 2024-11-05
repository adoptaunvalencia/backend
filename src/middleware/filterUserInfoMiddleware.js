const User = require('../models/users-model/user.model.js');
const AssistanceOffer = require('../models/assistance-offer-model/assistanceOffer.model.js');

const filterUserInfo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const assistanceOffer = await AssistanceOffer.findById(id);

    if (assistanceOffer) {
      const user = await User.findById(assistanceOffer.userId);
      req.user = user;
      req.assistance = assistanceOffer;
    }

    const token = req.headers.authorization && req.headers.authorization?.split(' ')[1];
    token ? (req.isAuth = true) : (req.isAuth=false);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = filterUserInfo;
