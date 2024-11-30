// routes/inscripcionRoutes.js
const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcionController");

router.get("/inscripcion", inscripcionController.listarInscripcion);
router.post("/inscripcion", inscripcionController.crearInscripcion);
router.put("/inscripcion/:id", inscripcionController.actualizarInscripcion);
router.delete("/inscripcion/:id", inscripcionController.eliminarInscripcion);

module.exports = router;
