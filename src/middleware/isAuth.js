const User = require('../models/users-model/user.model.js');
const AssistanceOffer = require('../models/assistance-offer-model/assistanceOffer.model.js');

const isAuth = async (req, res, next) => {
  const { id } = req.params;
  const token =
    req.headers.authorization && req.headers.authorization?.split(' ')[1];
  if (!id) {
    req.isAuth = token ? true : false;
    return next();
  }
  req.isAuth = token ? true : false;
  next();
};

module.exports = isAuth;
