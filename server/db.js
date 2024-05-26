const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    "CarSalePlatform",
    "postgres",
    "root",
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)