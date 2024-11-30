const eventoService = require('../Service/eventoService');
const Usuario=require('../models/usuarios');

class EventoController {
  
  static async listarEvento(req, res) {
    try {
      const eventos = await eventoService.listarEventos();
      res.json(eventos);
    } catch (error) {
      console.error('Error al listar eventos:', error);
      res.json({ error: 'Error al listar eventos.' });
    }
  }

  // Crear evento 
  static async crearEvento(req, res) {
    try {
      const { usuarioId } = req.body;  

      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado.' });
      }

      if (usuario.rol !== 'admin') {
        return res.json({ error: 'No tienes permisos  para crear eventos.' });
      }
      const datosEvento = req.body;
      const evento = await eventoService.crearEvento(datosEvento);
      res.json(evento);
    } catch (error) {
      console.error('Error al crear evento:', error);
      res.json({ error: 'Error al crear evento.' });
    }
  }

  static async actualizarEvento(req, res) {
    try {
      const { usuarioId } = req.body;  
      const { id } = req.params; 

      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado.' });
      }

      if (usuario.rol !== 'admin') {
        return res.json({ error: 'No tienes permiso para editar eventos.' });
      }

      const datosEvento = req.body;
      const evento = await eventoService.actualizarEvento(id, datosEvento);
      res.json(evento);
    } catch (error) {
      console.error('Error al actualizar', error);
      res.json({ error: 'Error al actualizar .' });
    }
  }

  static async eliminarEvento(req, res) {
    try {
      const { usuarioId } = req.body;  
      const { id } = req.params; 
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      if (usuario.rol !== 'admin') {
        return res.json({ error: 'No tienes permisos para eliminar eventos.' });
      }

      const mensaje = await eventoService.eliminarEvento(id);
      res.json(mensaje);
    } catch (error) {
      console.error('Error al eliminar evento:', error);
      res.json({ error: 'Error al eliminar evento.' });
    }
  }

  static async inscribirseEnEvento(req, res) {
    try {
      const { usuarioId, eventoId } = req.body;
      const inscripcion = await eventoService.inscribirseEnEvento(usuarioId, eventoId);
      res.json(inscripcion);
    } catch (error) {
      console.error('Error al inscribirse en evento:', error);
      res.json({ error: 'Error al inscribirse en evento.' });
    }
  }

  static async cancelarInscripcion(req, res) {
    try {
      const { usuarioId, eventoId } = req.body;
      const mensaje = await eventoService.cancelarInscripcion(usuarioId, eventoId);
      res.json(mensaje);
    } catch (error) {
      console.error('Error al cancelar inscripción:', error);
      res.json({ error: 'Error al cancelar inscripción.' });
    }
  }

}

module.exports = EventoController;
