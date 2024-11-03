const ROUTER = require('express').Router()
const LoginController = require('../../controllers/user.controller/login.controller')
const RegisterController = require('../../controllers/user.controller/register.controller')
const registerUser = require('../../middleware/registerMiddleware')
const loginUser = require('../../middleware/loginUser')

//ROUTE | MIDDLEWARE | CONTROLLER
ROUTER.post('/register-user', registerUser ,RegisterController)
ROUTER.post('/login-user', loginUser, LoginController)

module.exports = ROUTER