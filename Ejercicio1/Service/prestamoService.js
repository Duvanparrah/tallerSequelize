let Prestamo = require("../models/Prestamo");

class PrestamoService {
  static async listarPrestamo() {
    try {
      const prestamo = await Prestamo.findAll();
      return prestamo;
    } catch (error) {
      console.error("Error al listar los libros:", error);
      throw new Error("No se pudieron listar los libros");
    }
  }

  static async crearPrestamo(datos) {
    try {
      let prestamo = await Prestamo.create(datos);
      return prestamo;
    } catch (error) {
      console.log("libro no creado", error);
    }
  }

  static async actualizarPrestamo(id, datos) {
    try {
      let [prestamoActualizado] = await Prestamo.update(datos, {
        where: { id },
      });
      if (prestamoActualizado == 0) {
        console.log("Cual Libro, aqui no hay nada");
      } else {
        return datos;
      }
    } catch (error) {
      console.log("error al actualizar el libro" + error);
    }
  }

  static async eliminarPrestamo(id) {
    try {
      let prestamoEliminado = await Prestamo.destroy({ where: { id } });
      if (prestamoEliminado == 0) {
        console.log("Cual libro, aqui no hay nada");
      } else {
        return prestamoEliminado;
      }
    } catch (error) {
      console.log("error al eliminar el libro" + error);
    }
  }

  static async  obtenerPrestamosMasRecientes() {
    try {
      const prestamos = await Prestamo.findAll({
        order: [['fecha_prestamo', 'DESC']],
        limit: 5, //limitamos la lista
      });
      return prestamos;
    } catch (error) {
      throw new Error('Error al obtener los préstamos más recientes: ' + error.message);
    }
  }
}
module.exports = PrestamoService;
