const ROUTER = require('express').Router()


const user_routes = require('./user.routes/user.routes')
ROUTER.use('/user', user_routes)

module.exports = ROUTER