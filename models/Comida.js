const { DataTypes } = require('sequelize')
const db = require('../db/conn.js')

const Pessoa = db.define('comida',{
    nome : {
        type: DataTypes.STRING(150)
    },
    nacionalidade: {
        type: DataTypes.STRING(30)
    },
    idade : {
        type : DataTypes.INTEGER
    }
},{
    createdAt: false,
    updatedAt: false
})

// Pessoa.sync({force:true})

module.exports = Pessoa