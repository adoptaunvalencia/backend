const mongoose = require('mongoose')

const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DDBB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connect')
  } catch (error) {
    console.log('Error:', error)
    process.exit(1);
  }
}

module.exports = connection