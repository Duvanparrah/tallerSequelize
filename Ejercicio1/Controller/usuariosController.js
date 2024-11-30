const usuarioService = require("../Service/usuarioService");

class usuarioController {
  static async listarUsuario(req, res) {
    try {
      const usuario = await usuarioService.listarUsuario();
      res.json(usuario);
    } catch (error) {
      console.error('Error al listar los usuarios:', error); 
      res.json({ error: 'Error al listar los usuarios.' }); 
    }
  }
  

  static async crearUsuario(req, res) { 
    try {
      const crearUsuario = await usuarioService.crearUsuario(req.body);
      res.json(crearUsuario);
    } catch (error) {
      res.json({ error: "Error al crear el Usuario ingresado." });
    }
  }

  static async actualizarUsuario(req, res) {
    try {
      const usuarioActualizado = await usuarioService.actualizarUsuario(
        req.params.id,
        req.body
      );
      if (!usuarioActualizado) {
        return res.json({ error: "Usuario no encontrado." });
      }
      res.json(usuarioActualizado);
    } catch (error) {
      res.json({ error: "Error al actualizar el Usuario solicitado." });
    }
  }

  static async eliminarUsuario(req, res) {
    try {
      const usuarioEliminado = await usuarioService.eliminarUsuario(
        req.params.id
      );
      if (!usuarioEliminado) {
        return res.json({ error: "Este Usuario no ha sido encontrado." });
      }
      res.json({ message: "Usuario eliminado correctamente." });
    } catch (error) {
      res.json({ error: "Error al eliminar el Usuario." });
    }
  }
}

module.exports = usuarioController;
