const Evento = require('../models/evento');
const Inscripcion = require('../models/inscripcion');
const Usuario = require('../models/usuarios');

class EventoService {

  static async listarEventos() {
    try {
      const eventos = await Evento.findAll();
      return eventos;
    } catch (error) {
      console.error('Error al listar eventos:', error);
      throw new Error('No se pudieron obtener los eventos');
    }
  }

  static async crearEvento(datosEvento) {
    try {
      const evento = await Evento.create(datosEvento);
      return evento;
    } catch (error) {
      console.error('Error al crear el evento:', error);
      throw new Error('No se pudo crear el evento');
    }
  }

  static async actualizarEvento(id, datosEvento) {
    try {
      const evento = await Evento.findByPk(id);
      if (!evento) {
        throw new Error('Evento no encontrado');
      }
      await evento.update(datosEvento);
      return evento;
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
      throw new Error('No se pudo actualizar el evento');
    }
  }

  static async eliminarEvento(id) {
    try {
      const evento = await Evento.findByPk(id);
      if (!evento) {
        throw new Error('Evento no encontrado');
      }
      await evento.destroy();
      return { mensaje: 'Evento eliminado correctamente' };
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      throw new Error('No se pudo eliminar el evento');
    }
  }

  static async inscribirseEnEvento(usuarioId, eventoId) {
    try {
      const evento = await Evento.findByPk(eventoId);
      if (!evento) {
        throw new Error('Evento no encontrado');
      }
      if (evento.inscripciones_actuales >= evento.capacidad_maxima) {
        throw new Error('Capacidad máxima alcanzada');
      }
      const inscripcion = await Inscripcion.create({
        usuario_id: usuarioId,
        evento_id: eventoId,
      });
      await evento.increment('inscripciones_actuales');
      return inscripcion;
    } catch (error) {
      console.error('Error al inscribirse en el evento:', error);
      throw new Error('No se pudo inscribir en el evento');
    }
  }

  static async cancelarInscripcion(usuarioId, eventoId) {
    try {
      const inscripcion = await Inscripcion.findOne({
        where: { usuario_id: usuarioId, evento_id: eventoId },
      });
      if (!inscripcion) {
        throw new Error('Inscripción no encontrada');
      }
      await inscripcion.destroy();
      const evento = await Evento.findByPk(eventoId);
      await evento.decrement('inscripciones_actuales');
      return { mensaje: 'Inscripción cancelada correctamente' };
    } catch (error) {
      console.error('Error al cancelar la inscripción:', error);
      throw new Error('No se pudo cancelar la inscripción');
    }
  }

  static async obtenerEventosMasPopulares() {
    try {
      const eventos = await Evento.findAll({
        include: [{
          model: Inscripcion,
          as: 'inscripciones',
          attributes: ['id'],
        }],
        group: ['Evento.id'],
        order: [[Sequelize.fn('COUNT', Sequelize.col('inscripciones.id')), 'DESC']],
      });
      return eventos;
    } catch (error) {
      console.error('Error al obtener los eventos más populares:', error);
      throw new Error('No se pudieron obtener los eventos populares');
    }
  }
}

module.exports = EventoService;
