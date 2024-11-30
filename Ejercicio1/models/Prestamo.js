const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Usuario = require("./Usuario");
const Libro = require("./Libro");

const Prestamo = sequelize.define(
  "Prestamo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_prestamo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_devolucion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Libro,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "prestamos",
  }
);

//correcion, recordar cambiar la tabla de laDB 
Usuario.hasMany(Prestamo, { foreignKey: "usuario_id", as: "prestamos" });
Prestamo.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });

Libro.hasMany(Prestamo, { foreignKey: 'libro_id', as: 'librosPrestados' });
Prestamo.belongsTo(Libro, { foreignKey: 'libro_id', as: 'libro' });



module.exports = Prestamo;
