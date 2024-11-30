const usuarioService = require("../Service/usuarioService");

class usuarioController {

  static async listarUsuario(req, res) {
    try {
      const usuario = await usuarioService.listarUsuario();  
      res.json(usuario);  
    } catch (error) {
      console.error('Error al listar usuarios:', error); 
      res.json({ error: 'Error al listar usuarios.' });  
    }
  }

 
  static async crearUsuario(req, res) {
    try {
      const { nombre, email } = req.body;  
      if (!nombre || !email) {
        return res.json({ error: 'El nombre y el email son requeridos.' });
      }
      const nuevoUsuario = await usuarioService.crearUsuario({ nombre, email });   usuario
      res.json(nuevoUsuario);  
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.json({ error: 'Error al crear usuario.' }); 
    }
  }


  static async actualizarUsuario(req, res) {
    try {
      const { id } = req.params;  
      const { nombre, email } = req.body;  

      if (!nombre && !email) {
        return res.json({ error: 'campo para actualizar' });
      }

      const usuarioActualizado = await usuarioService.actualizarUsuario(id, { nombre, email });
      res.json(usuarioActualizado);  
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      res.json({ error: 'Error al actualizar usuario.' });  
    }
  }

 
  static async eliminarUsuario(req, res) {
    try {
      const { id } = req.params;  
      const mensaje = await usuarioService.eliminarUsuario(id);  
      res.json(mensaje); 
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      res.json({ error: 'Error al eliminar usuario.' }); 
    }
  }
}

module.exports = usuarioController;
