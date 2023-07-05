const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const conn = require('./db/conn.js')
const Pessoa = require('./models/Comida.js')

const port = 3000
const hostname = 'localhost'

/* ======== */
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
/* ======== */
app.set('view engine', 'handlebars')
app.engine('handlebars', hbs.engine())
/* ======== */

app.post('/cadastrar', async (req,res)=>{
    const nome = req.body.nome
    const nacionalidade = req.body.nacionalidade
    const idade = Number(req.body.idade)

    const msg_error = 'Não foi possível cadastrar'

    if((typeof nome !== 'string')&&(typeof nacionalidade !== 'string')&&(typeof idade !== 'number')){
        console.log(msg_error)
    }else if((typeof nome === 'string')&&(typeof nacionalidade === 'string')&&(typeof idade === 'number')){
        await Pessoa.create({nome,nacionalidade,idade})
        res.redirect('/listar')
    }
    
})

app.get('/cadastrar', (req,res)=>{
    res.render('cadastrar')
})

app.get('/listar', async (req,res)=>{
    const b = await Pessoa.findAll({raw:true})
    res.render('listar',{a:b})
})

app.get('/',(req,res)=>{
    res.render('home')
})

/* ======== */
conn.sync().then(()=>{
    app.listen(port,hostname,()=>{
        console.log(`Servidor ${hostname} rodando em ${port}`)
    })
}).catch((err)=>{
    console.log(`Servidor não está rodando devido ao erro ${err}`)
})