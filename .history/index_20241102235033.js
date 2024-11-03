require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/users", userRoutes);

// Connection DDBB
const connection = require("./src/config/connection");
connection();

// Configurar puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server run, port: * ${PORT}`));