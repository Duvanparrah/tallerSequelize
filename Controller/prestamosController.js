const prestamoService = require("../Service/prestamoService");

class prestamoController {
  static async listarPrestamo(req, res) {
    try {
      const prestamo = await prestamoService.listarPrestamo();
      res.json(prestamo);
    } catch (error) {
      console.error('Error al listar los prestamos:', error); 
      res.json({ error: 'Error al listar los prestamos.' }); 
    }
  }
  

  static async crearPrestamo(req, res) { 
    try {
      const crearPrestamo = await prestamoService.crearPrestamo(req.body);
      res.json(crearPrestamo);
    } catch (error) {
      res.json({ error: "Error al crear el prestamo ingresado." });
    }
  }

  static async actualizarPrestamo(req, res) {
    try {
      const prestamoActualizado = await prestamoService.actualizarPrestamo(
        req.params.id,
        req.body
      );
      if (!prestamoActualizado) {
        return res.json({ error: "Prestamo no encontrado." });
      }
      res.json(prestamoActualizado);
    } catch (error) {
      res.json({ error: "Error al actualizar el prestamo solicitado." });
    }
  }

  static async eliminarPrestamo(req, res) {
    try {
      const prestamoEliminado = await prestamoService.eliminarPrestamo(
        req.params.id
      );
      if (!prestamoEliminado) {
        return res.json({ error: "Este prestamo no ha sido encontrado." });
      }
      res.json({ message: "Prestamo eliminado correctamente." });
    } catch (error) {
      res.json({ error: "Error al eliminar el prestamo." });
    }
  }

    // Método para obtener los préstamos más recientes
    static async listarPrestamosRecientes(req, res) {
      try {
        const prestamosRecientes = await prestamoService.obtenerPrestamosMasRecientes();
        res.json(prestamosRecientes);
      } catch (error) {
        console.error('Error', error);
        res.json({ error: 'Error' });
      }
    }
  
}

module.exports = prestamoController;
