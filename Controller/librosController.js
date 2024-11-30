const libroService = require("../Service/libroService");
const usuarioService = require("../Service/usuarioService");

class libroController {
  // Listar libros
  static async listarLibro(req, res) {
    try {
      const libros = await libroService.listarLibro(); 
      res.json(libros); 
    } catch (error) {
      console.error('Error al listar los libros:', error); 
      res.json({ error: 'Error al listar los libros.' }); 
    }
  }

  // Crear un libro
  static async crearLibro (req, res) {
    const { userId, titulo, autor, anio_publicacion } = req.body;
  
    try {
      const usuario = await usuarioService.obtenerUsuarioPorId(userId);
  
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado' });
      }
  
      if (usuario.rol !== 'admin') {
        return res.json({ error: 'Solo los administradores pueden crear libros' });
      }
  
      return res.json({ message: 'Libro creado exitosamente' });
    } catch (error) {
      console.error('Error al crear el libro:', error);
      return res.json({ error: 'Error al crear el libro ingresado.' });
    }
  };

  // Actualizar un libro (solo administradores)
  static async actualizarLibro(req, res) {
    try {
      const { userId } = req.body;
      const usuario = await usuarioService.obtenerUsuarioPorId(userId);

      if (!usuario || usuario.role !== 'admin') {
        return res.json({ error: "Solo los administradores pueden actualizar libros." });
      }

      const libroActualizado = await libroService.actualizarLibro(
        req.params.id,
        req.body
      );
      if (!libroActualizado) {
        return res.json({ error: "Libro no encontrado." });
      }
      res.json(libroActualizado);
    } catch (error) {
      res.json({ error: "Error al actualizar el libro solicitado." });
    }
  }

  // Eliminar un libro (solo administradores)
  static async eliminarLibro(req, res) {
    try {
      const { userId } = req.body;
      const usuario = await usuarioService.obtenerUsuarioPorId(userId);

      if (!usuario || usuario.role !== 'admin') {
        return res.json({ error: "Solo los administradores pueden eliminar libros." });
      }

      const libroEliminado = await libroService.eliminarLibro(
        req.params.id
      );
      if (!libroEliminado) {
        return res.json({ error: " libro no ha sido encontrado." });
      }
      res.json({ message: "Libro eliminado correctamente." });
    } catch (error) {
      res.json({ error: "Error al eliminar el libro." });
    }
  }

  // Obtener los libros más solicitados
  static async librosMasSolicitados(req, res) {
    try {
      const librosSolicitados = await libroService.obtenerLibrosMasSolicitados();
      res.json(librosSolicitados);
    } catch (error) {
      console.error("Error al obtener los libros más solicitados:", error);
      res.json({ error: "Error al obtener los libros más solicitados." });
    }
  }
}

module.exports = libroController;
