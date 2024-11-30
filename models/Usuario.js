const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    rol: {
      type: DataTypes.ENUM("admin", "usuarios"),
      allowNull: false,
      defaultValue: "usuarios",
    },
  },
  {
    timestamps: false,
    tableName: "usuarios",
  }
);

module.exports = Usuario;
