let { Sequelize } = require('sequelize');
let dotenv=require ('dotenv').config();
Sequelize = new Sequelize( //llamado al constructor del sequilize.
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log//muestra las consultas
    }
)
module.exports= Sequelize