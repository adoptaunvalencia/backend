const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DDBB)
    console.log('Connect')
  } catch (error) {
    console.log('Error:', error)
  }
}

module.exports = connection