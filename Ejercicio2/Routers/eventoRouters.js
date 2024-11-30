const express = require("express");
const router = express.Router();
const eventosController = require("../controller/eventosController");


router.get("/eventos", eventosController.listarEvento);
router.post("/eventos", eventosController.crearEvento);
router.put("/:id", eventosController.actualizarEvento);
router.delete("/:id", eventosController.eliminarEvento);
router.post("/inscripcion", eventosController.inscribirseEnEvento);
router.post("/cancelar-inscripcion", eventosController.cancelarInscripcion);

module.exports = router;
