require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const mainRoutes = require("./src/routes/mainRoutes");
app.use("secure/api/v1", mainRoutes);

// Connection DDBB
const connection = require("./src/config/connection");
connection();

app.get('*', (req, res, next) => {
const error = new Error(
    'La url a la que intentas acceder no existe, por favor contacta con soporte'
  )
  error.status = 404
  next(error)
})

// Conf PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server run, port: * ${PORT}`));