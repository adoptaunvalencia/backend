const ROUTER = require('express').Router();
const createAssistanceOfferController = require('../../controllers/assistanceOffer.controller/createAssistanceOffer.controller');
const getAllAssistanceOffersController = require('../../controllers/assistanceOffer.controller/getAllAssistanceOffers.controller');
const getAssistanceOfferByIdController = require('../../controllers/assistanceOffer.controller/getAssistanceOfferById.controller');
const updateAssistanceOfferController = require('../../controllers/assistanceOffer.controller/updateAssistanceOffer.controller');
const deleteAssistanceOfferController = require('../../controllers/assistanceOffer.controller/deleteAssistanceOffer.controller');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');

//ROUTE | MIDDLEWARE | CONTROLLER
//POST ASSISTANCE OFFER
ROUTER.post('/', authenticateUser, createAssistanceOfferController);
//GET ALL ASSISTANCE OFFERS
ROUTER.get('/', authenticateUser, getAllAssistanceOffersController);
//GET ASSISTANCE OFFER BY ID
ROUTER.get('/:id', authenticateUser, getAssistanceOfferByIdController);
//UPDATE ASSISTANCE OFFER
ROUTER.put('/:id', authenticateUser, updateAssistanceOfferController);
//DELETE ASSISTANCE OFFER
ROUTER.delete('/:id', authenticateUser, deleteAssistanceOfferController);

module.exports = ROUTER;
