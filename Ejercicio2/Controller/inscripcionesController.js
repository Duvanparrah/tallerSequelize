const inscripcionService = require("../Service/inscripcionService");
const Usuario=require('../models/usuarios');
const Evento= require('../models/evento');
const Inscripcion= require('../models/inscripcion'); 

class InscripcionController {


  static async listarInscripcion(req, res) {
    try {
      const { usuarioId } = req.body; 

      // Verificar si el usuario existe
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado.' });
      }
      const inscripciones = await Inscripcion.findAll({
        where: { usuario_id: usuarioId },
        include: [{ model: Evento }] //no reconoce, cambiar
      });

      res.json(inscripciones);
    } catch (error) {
      console.error('Error al listar inscripciones:', error);
      res.json({ error: 'Error al listar inscripciones.' });
    }
  }

  static async crearInscripcion(req, res) {
    try {
      const { usuarioId, eventoId } = req.body;

      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado.' });
      }

      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        return res.json({ error: 'Evento no encontrado.' });
      }

      if (evento.inscripciones_actuales >= evento.capacidad_maxima) {
        return res.json({ error: 'No hay espacio  en este evento.' });
      }
      const inscripcion = await Inscripcion.create({
        usuario_id: usuarioId,
        evento_id: eventoId
      });
      evento.inscripciones_actuales += 1;
      await evento.save();

      res.json(inscripcion);
    } catch (error) {
      console.error('Error al crear inscripcion:', error);
      res.json({ error: 'Error al crear .' });
    }
  }

  static async actualizarInscripcion(req, res) {
    try {
      const { usuarioId, eventoId, nuevaFecha } = req.body;
      const inscripcion = await Inscripcion.findOne({
        where: { usuario_id: usuarioId, evento_id: eventoId }
      });

      if (!inscripcion) {
        return res.json({ error: 'Inscripción no encontrada.' });
      }
      inscripcion.fecha_inscripcion = nuevaFecha || inscripcion.fecha_inscripcion;
      await inscripcion.save();

      res.json(inscripcion);
    } catch (error) {
      console.error('Error al actualizar inscripción:', error);
      res.json({ error: 'Error al actualizar inscripción.' });
    }
  }

  static async eliminarInscripcion(req, res) {
    try {
      const { usuarioId, eventoId } = req.body;
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.json({ error: 'Usuario no encontrado.' });
      }

      const inscripcion = await Inscripcion.findOne({
        where: { usuario_id: usuarioId, evento_id: eventoId }
      });

      if (!inscripcion) {
        return res.json({ error: 'Inscripción no encontrada.' });
      }

      if (usuario.rol === 'admin' || inscripcion.usuario_id === usuarioId) {
        await inscripcion.destroy();
        const evento = await Evento.findByPk(eventoId);
        evento.inscripciones_actuales -= 1;
        await evento.save();

        res.json({ message: 'Inscripción cancelada exitosamente.' });
      } else {
        return res.json({ error: 'No tienes permisos a cancelar esta inscripción.' });
      }
    } catch (error) {
      console.error('Error al eliminar :', error);
      res.json({ error: 'Error al eliminar .' });
    }
  }

}

module.exports = InscripcionController;
