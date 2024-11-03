require('dotenv').config();
const express = require('express');
const cors = require('cors');

const APP = express();

// Middleware
APP.use(cors());
APP.use(express.json());

// Import routes
const mainRoutes = require('./src/routes/mainRoutes');
APP.use('secure/api/v1', mainRoutes);

// Connection DDBB
const connection = require('./src/config/connection');
connection();

APP.get('*', (req, res, next) => {
  const error = new Error(
    'La url a la que intentas acceder no existe, por favor contacta con soporte',
  );
  error.status = 404;
  next(error);
});

APP.use((error, req, res, next) => {
  console.error('Error detectado: ', error.message)
  res.status(error.status || 500).json({
    message:
      error.message || 'Hubo un problema en el servidor, intenta más tarde.'
  })
})

// Conf PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server run, port: * ${PORT}`));
