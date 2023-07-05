const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('crud2','root','senai',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize