const mongoose = require('mongoose');
const config = require('./config.env');

const connection = async () => {
  try {
    await mongoose.connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected MongoDB');
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

module.exports = connection;
