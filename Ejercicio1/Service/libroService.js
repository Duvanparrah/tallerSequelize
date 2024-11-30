const Sequelize = require('sequelize');
const Libro = require("../models/Libro");
const Prestamo = require("../models/Prestamo");

class LibroService {
  // Listar todos los libros
  static async listarLibro() {
    try {
      const libros = await Libro.findAll();
      return libros;
    } catch (error) {
      console.error("Error al listar los libros:", error);
      throw new Error("No se pudieron listar los libros.");
    }
  }

  // Crear un libro
  static async crearLibro(datos) {
    try {
      if (!datos.titulo || !datos.autor || !datos.anio_publicacion) {
        throw new Error("Faltan datos obligatorios para crear el libro.");
      }

      const libro = await Libro.create(datos);
      return libro;
    } catch (error) {
      console.error("Error al crear el libro:", error);
      throw new Error("No se pudo crear el libro.");
    }
  }

  // Actualizar un libro
  static async actualizarLibro(id, datos) {
    try {
      const libro = await Libro.findByPk(id);
      if (!libro) {
        throw new Error("El libro no existe.");
      }

      await libro.update(datos);
      return libro;
    } catch (error) {
      console.error("Error al actualizar el libro:", error);
      throw new Error("No se pudo actualizar el libro.");
    }
  }

  // Eliminar un libro
  static async eliminarLibro(id) {
    try {
      const libro = await Libro.findByPk(id);
      if (!libro) {
        throw new Error("El libro no existe.");
      }

      await libro.destroy();
      return { message: "Libro eliminado correctamente." };
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      throw new Error("No se pudo eliminar el libro.");
    }
  }

  // Obtener los libros más solicitados
  static async obtenerLibrosMasSolicitados() {
    try {
      const libros = await Libro.findAll({
        include: [{
          model: Prestamo,
          as: 'librosPrestados', 
          attributes: ['id'],
        }],
        order: [[Sequelize.fn('COUNT', Sequelize.col('librosPrestados.id')), 'DESC']], 
        group: ['Libro.id'],
      });

      return libros;
    } catch (error) {
      console.error('Error al obtener los libros más solicitados:', error);
      throw new Error('No se pudieron obtener los libros más solicitados.');
    }
  }
}

module.exports = LibroService;