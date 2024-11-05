const ROUTER = require('express').Router();
const LoginController = require('../../controllers/user.controller/login.controller');
const RegisterController = require('../../controllers/user.controller/register.controller');
const registerUser = require('../../middleware/registerMiddleware');
const loginUser = require('../../middleware/loginMiddleware');
const authenticateUser = require('../../middleware/authenticateUserMiddleware');
const getProfile = require('../../controllers/user.controller/getProfile.controller');
const {
  forgotPassword,
  comproveToken,
} = require('../../controllers/user.controller/forgotPassword.controller');
const putPassword = require('../../controllers/user.controller/putPassword.controller');
const {
  updateUser,
  updateAddress,
} = require('../../controllers/user.controller/updateUser.controller');

//ROUTE | MIDDLEWARE | CONTROLLER
//GET PROFILE
ROUTER.get('/', authenticateUser, getProfile);
//ROUTE REGISTER
ROUTER.post('/register-user', registerUser, RegisterController);
//LOGIN
ROUTER.post('/login-user', loginUser, LoginController);
// FORGOT PASSWORD
ROUTER.post('/forgot-password', forgotPassword);
// COMPROVE TOKEN
ROUTER.post('/comprove-token', comproveToken);
// CREATE NEW PASSWORD
ROUTER.put('/create-password', putPassword);
// UPDATE USER
ROUTER.put('/update-user', authenticateUser, updateUser);
// UPDATE ADDRESS
ROUTER.put('/update-address', authenticateUser, updateAddress);

module.exports = ROUTER;
