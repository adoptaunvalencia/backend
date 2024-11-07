// ENV
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'integration';
dotenv.config({ path: `.env.${env}` });
// END ENV

const config = require('./src/config/config.env');
const express = require('express');
const cors = require('cors');
const connectCloudinary = require('./src/config/cloudinary');

const APP = express();

// Middleware
APP.use(cors());
APP.use(express.json());

// Connection DDBB
const connection = require('./src/config/connection');
connection();
// End Connection DDBB

//Cloudinary
connectCloudinary();

// ROUTES
const mainRoutes = require('./src/routes/mainRoutes');
APP.use('/secure/api/v1', mainRoutes);

APP.get('*', (req, res, next) => {
  const error = new Error(
    'The URL you are trying to access does not exist. Please contact support.',
  );
  error.status = 404;
  next(error);
});

APP.use((error, req, res, next) => {
  console.error('Error: ', error.message);
  res.status(error.status || 500).json({
    message:
      error.message ||
      'There was a problem with the server. Please try again later.',
  });
});
//END ROUTES

// CONFIG PORT
const PORT = config.port;
APP.listen(PORT, () => console.log(`Server run, port: * ${PORT}`));
// END CONFIG PORT
