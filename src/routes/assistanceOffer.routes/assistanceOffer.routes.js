const ROUTER = require('express').Router();
const createAssistanceOffer = require('../../controllers/assistanceOffer.controller/createAssistanceOffer.controller');
const {
  getAllAssistanceOffers,
  getFilterOffers,
  getAllAssistanceOffersMap,
} = require('../../controllers/assistanceOffer.controller/getAllAssistanceOffers.controller');

const getAssistanceOffer = require('../../controllers/assistanceOffer.controller/getAssistanceOfferById.controller');
const updateAssistanceOffer = require('../../controllers/assistanceOffer.controller/updateAssistanceOffer.controller');
const deleteAssistanceOffer = require('../../controllers/assistanceOffer.controller/deleteAssistanceOffer.controller');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');
const isAuth = require('../../middleware/isAuth');
const validateOffer = require('../../middleware/validateOfferMiddleware');
const {
  imgAssistanceOffer,
} = require('../../middleware/checkAvatarMiddleware');
const getAssistanceOffersByUser = require('../../controllers/assistanceOffer.controller/getAssistanceOffersByUser.controller');

//ROUTE | MIDDLEWARE | CONTROLLER
//POST ASSISTANCE OFFER
ROUTER.post(
  '/create-assitances',
  authenticateUser,
  validateOffer,
  /* imgAssistanceOffer.single('img'), */
  createAssistanceOffer,
);
//GET ALL ASSISTANCE OFFERS
ROUTER.get('/', isAuth, getAllAssistanceOffers);
ROUTER.get('/map-offers', isAuth, getAllAssistanceOffersMap);
//GET ASSISTANCE OFFER BY ID
ROUTER.get('/get-assistance/:id', isAuth, getAssistanceOffer);
//GET ASSISTANCE OFFER BY LOGGED USER
ROUTER.get('/get-user-assistance', authenticateUser, getAssistanceOffersByUser);
//UPDATE ASSISTANCE OFFER
ROUTER.put(
  '/update-assistance/:id',
  authenticateUser,
  validateOffer,
  /* imgAssistanceOffer.single('img'), */
  updateAssistanceOffer,
);
//DELETE ASSISTANCE OFFER
ROUTER.delete(
  '/delete-assistance/:id',
  authenticateUser,
  deleteAssistanceOffer,
);
// FILTER
ROUTER.get('/filter', isAuth, getFilterOffers);

module.exports = ROUTER;
