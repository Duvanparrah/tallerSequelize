const Usuario = require('../models/usuarios');

class UsuarioService {

  static async listarUsuario() {
    try {
      const usuario = await Usuario.findAll();  
      return usuario;  
    } catch (error) {
      console.error('Error al listar los usuarios:', error);
      throw new Error('No se pudieron listar los usuarios');
    }
  }


  static async crearUsuario(data) {
    try {
      const nuevoUsuario = await Usuario.create({
        nombre: data.nombre,
        email: data.email
      }); 
      return nuevoUsuario;  
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      throw new Error('No se pudo crear el usuario');
    }
  }


  static async actualizarUsuario(id, data) {
    try {
      const usuario = await Usuario.findByPk(id); 
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      await usuario.update({
        nombre: data.nombre || usuario.nombre,  
        email: data.email || usuario.email       
      });
      return usuario;  
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      throw new Error('No se pudo actualizar el usuario');
    }
  }

 
  static async eliminarUsuario(id) {
    try {
      const usuario = await Usuario.findByPk(id);  
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      await usuario.destroy();  
      return { message: 'Usuario eliminado con éxito' }; 
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      throw new Error('No se pudo eliminar el usuario');
    }
  }
}

module.exports = UsuarioService;
