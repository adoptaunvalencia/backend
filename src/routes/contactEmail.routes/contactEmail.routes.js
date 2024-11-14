const ROUTER = require('express').Router();
const createContactEmail = require('../../controllers/contactEmail.controller/createContactEmail.controller.js');
const getContactEmailById = require('../../controllers/contactEmail.controller/getContactEmailById.controller.js');
const validateEmail = require('../../middleware/validateEmailMiddleware.js');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');

//ROUTE | MIDDLEWARE | CONTROLLER
//POST CONTACT EMAIL
ROUTER.post(
  '/create-email',
  authenticateUser,
  validateEmail,
  createContactEmail,
);

//GET CONTACT EMAIL BY ID
ROUTER.get(
  '/get-email/:id',
  authenticateUser,
  getContactEmailById);

module.exports = ROUTER;
