const ROUTER = require('express').Router();
const LoginController = require('../../controllers/user.controller/login.controller');
const RegisterController = require('../../controllers/user.controller/register.controller');
const registerUser = require('../../middleware/registerMiddleware');
const loginUser = require('../../middleware/loginMiddleware');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');
const getProfile = require('../../controllers/user.controller/getProfile.controller');

//ROUTE | MIDDLEWARE | CONTROLLER
//ROUTE REGISTER
ROUTER.post('/register-user', registerUser, RegisterController);
//LOGIN
ROUTER.post('/login-user', loginUser, LoginController);
//GET PROFILE
ROUTER.get('/', authenticateUser, getProfile);

module.exports = ROUTER;
