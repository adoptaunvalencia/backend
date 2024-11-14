const ROUTER = require('express').Router();

const user_routes = require('./user.routes/user.routes');
ROUTER.use('/user', user_routes);

const assistanceOffer_routes = require('./assistanceOffer.routes/assistanceOffer.routes')
ROUTER.use('/assistance-offer', assistanceOffer_routes)

const contactEmail_routes = require('./contactEmail.routes/contactEmail.routes')
ROUTER.use('/contact-email', contactEmail_routes)

module.exports = ROUTER;
