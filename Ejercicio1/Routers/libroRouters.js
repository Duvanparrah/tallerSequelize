const express = require("express");
const libroController = require("../controller/librosController");
const router = express.Router();

// Rutas CRUD básicas
router.get("/libros", libroController.listarLibro);
router.post("/libros", libroController.crearLibro);
router.put("/libros/:id", libroController.actualizarLibro);
router.delete("/libros/:id", libroController.eliminarLibro);

// Ruta para libros más solicitados
router.get("/libros/mas-solicitados", libroController.librosMasSolicitados);

module.exports = router;
