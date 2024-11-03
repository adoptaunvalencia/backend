const ROUTER = require('express').Router()
const LoginController = require('../../controllers/user.controller/login.controller')
const RegisterController = require('../../controllers/user.controller/register.controller')
const registerUser = require('../../middleware/registerMiddleware')
const loginUser = require('../../middleware/registerMiddleware')

ROUTER.post('/register-user', registerUser ,RegisterController)
ROUTER.post('/login-user', LoginController)

module.exports = ROUTER