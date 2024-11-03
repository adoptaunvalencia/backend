const ROUTER = require('express').Router()
const {LoginController} = require('../../controllers/user.controller/login.controller')
const {RegisterController} = require('../../controllers/user.controller/register.controller')

ROUTER.post('/user/register-user', RegisterController)
ROUTER.post('/user/login-user', LoginController)

module.exports = ROUTER