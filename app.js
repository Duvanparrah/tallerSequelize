const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.NUBE;
const libroRoutes = require("./Routers/libroRouters");
const prestamoRoutes = require("./Routers/prestamoRouters");
const usuarioRoutes = require("./Routers/usuarioRouters");

// Llamado a la base de datos
const sequelize = require("./config/database");

// BODY json
app.use(express.json());

app.use("/api", libroRoutes);
app.use("/api", prestamoRoutes);
app.use("/api", usuarioRoutes);

// Llamada al servidor y DB
let startDB = async () => {
  try {
    await sequelize.sync(); //{ alter: true }
    console.log("Base de datos sincronizada correctamente.");
    app.listen(port, () => {
      console.log("El servidor está corriendo en el puerto:", port);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
};


startDB();
