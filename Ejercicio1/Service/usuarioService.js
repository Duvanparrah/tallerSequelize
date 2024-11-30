let Usuario = require("../models/Usuario");

class UsuarioService {
  static async listarUsuario() {
    try {
      const usuario = await Usuario.findAll();
      return usuario;
    } catch (error) {
      console.error("Error al listar los libros:", error); 
      throw new Error("No se pudieron listar los libros"); 
    }
  }

  static async crearUsuario(datos) {
    try {
      let usuario = await Usuario.create(datos);
      return usuario;
    } catch (error) {
      console.log("Usuario no creado", error);
    }
  }

  static async actualizarUsuario(id, datos) {
    try {
      let [usuarioActualizado] = await Usuario.update(datos, { where: { id } }); 
      if (usuarioActualizado == 0) {
        console.log("Cual Usuario, aqui no hay nada");
      } else {
        return datos;
      }
    } catch (error) {
      console.log("error al actualizar el Usuario" + error);
    }
  }

  static async eliminarUsuario(id) {
    try {
      let usuarioEliminado = await Usuario.destroy({ where: { id } });
      if (usuarioEliminado == 0) {
        console.log("Cual Usuario, aqui no hay nada");
      } else {
        return usuarioEliminado;
      }
    } catch (error) {
      console.log("error al eliminar el libro" + error);
    }
  }

  static async obtenerUsuarioPorId(id){
    try {
      const usuario = await Usuario.findByPk(id); 
      return usuario;
    } catch (error) {
      throw new Error('Error al obtener usuario por ID');
    }
  };
}
module.exports = UsuarioService;
