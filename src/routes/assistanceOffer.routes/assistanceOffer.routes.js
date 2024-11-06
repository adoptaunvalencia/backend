const ROUTER = require('express').Router();
const createAssistanceOfferController = require('../../controllers/assistanceOffer.controller/createAssistanceOffer.controller');
const getAllAssistanceOffersController = require('../../controllers/assistanceOffer.controller/getAllAssistanceOffers.controller');
const getAssistanceOfferByIdController = require('../../controllers/assistanceOffer.controller/getAssistanceOfferById.controller');
const updateAssistanceOfferController = require('../../controllers/assistanceOffer.controller/updateAssistanceOffer.controller');
const deleteAssistanceOfferController = require('../../controllers/assistanceOffer.controller/deleteAssistanceOffer.controller');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');
const isAuth = require('../../middleware/isAuth');
const {
  imgAssistanceOffer,
} = require('../../middleware/checkAvatarMiddleware');

//ROUTE | MIDDLEWARE | CONTROLLER
//POST ASSISTANCE OFFER
ROUTER.post(
  '/create-assitance',
  authenticateUser,
  /* imgAssistanceOffer.single('img'), */
  createAssistanceOfferController,
);
//GET ALL ASSISTANCE OFFERS
ROUTER.get('/', isAuth, getAllAssistanceOffersController);
//GET ASSISTANCE OFFER BY ID
ROUTER.get('/get-assistance/:id', isAuth, getAssistanceOfferByIdController);
//UPDATE ASSISTANCE OFFER
ROUTER.put(
  '/update-assistance/:id',
  authenticateUser,
  /* imgAssistanceOffer.single('img'), */
  updateAssistanceOfferController,
);
//DELETE ASSISTANCE OFFER
ROUTER.delete(
  '/delete-assistance/:id',
  authenticateUser,
  deleteAssistanceOfferController,
);

module.exports = ROUTER;
