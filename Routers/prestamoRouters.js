const express = require("express");
const prestamoController = require('../controller/prestamosController');
const router = express.Router();

router.get("/prestamo", prestamoController.listarPrestamo);
router.post("/prestamo", prestamoController.crearPrestamo);
router.put("/prestamo/:id", prestamoController.actualizarPrestamo);
router.delete("/prestamo/:id", prestamoController.eliminarPrestamo);

router.get('/prestamos/recientes', prestamoController.listarPrestamosRecientes);

module.exports = router;
