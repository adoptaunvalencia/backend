const ROUTER = require('express').Router();
const createAssistanceOffer = require('../../controllers/assistanceOffer.controller/createAssistanceOffer.controller');
const {
  getAllAssistanceOffers,
  getFilterOffers,
} = require('../../controllers/assistanceOffer.controller/getAllAssistanceOffers.controller');
const getAssistanceOffer = require('../../controllers/assistanceOffer.controller/getAssistanceOfferById.controller');
const updateAssistanceOffer = require('../../controllers/assistanceOffer.controller/updateAssistanceOffer.controller');
const deleteAssistanceOffer = require('../../controllers/assistanceOffer.controller/deleteAssistanceOffer.controller');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');
const isAuth = require('../../middleware/isAuth');
const {
  imgAssistanceOffer,
} = require('../../middleware/checkAvatarMiddleware');

//ROUTE | MIDDLEWARE | CONTROLLER
//POST ASSISTANCE OFFER
ROUTER.post(
  '/create-assitances',
  authenticateUser,
  /* imgAssistanceOffer.single('img'), */
  createAssistanceOffer,
);
//GET ALL ASSISTANCE OFFERS
ROUTER.get('/', isAuth, getAllAssistanceOffers);
//GET ASSISTANCE OFFER BY ID
ROUTER.get('/get-assistance/:id', isAuth, getAssistanceOffer);
//UPDATE ASSISTANCE OFFER
ROUTER.put(
  '/update-assistance/:id',
  authenticateUser,
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
