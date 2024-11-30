const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inscripcion = sequelize.define(
  "Inscripcion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "inscripciones",
  }
);

module.exports = Inscripcion;
