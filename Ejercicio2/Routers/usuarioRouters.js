const express = require("express");
const usuarioController = require("../controller/usuariosController");
const router = express.Router();

router.get("/usuarios", usuarioController.listarUsuario);
router.post("/usuarios", usuarioController.crearUsuario);
router.put("/usuarios/:id", usuarioController.actualizarUsuario);
router.delete("/usuarios/:id", usuarioController.eliminarUsuario);

module.exports = router;

