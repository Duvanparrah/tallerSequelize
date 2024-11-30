const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Libro = sequelize.define(
  "Libro",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anio_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    disponibilidad: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true, 
      defaultValue: DataTypes.NOW, 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    timestamps: false,
    tableName: "libros", 
  }
);
module.exports = Libro;
