const cloudinary = require('cloudinary').v2;
const config = require('./config.env')

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_secret: config.cloudinary.secret,
    api_key: config.cloudinary.key,
  });
};
module.exports = connectCloudinary;
