const express = require("express");
const usuarioController = require("../controller/usuariosController");
const router = express.Router();

router.get("/usuario", usuarioController.listarUsuario);
router.post("/usuario", usuarioController.crearUsuario);
router.put("/usuario/:id", usuarioController.actualizarUsuario);
router.delete("/usuario/:id", usuarioController.eliminarUsuario);

module.exports = router;
