const jwt = require('jsonwebtoken')
const config = require('./config.env')

const generateJWT = (id) => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn: '30d' })
}
const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret)
}
module.exports = { generateJWT, verifyToken }
