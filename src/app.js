const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const funciones = require('./funciones')
const port = process.env.port // 3000
//const { get } = require('http');
//const dirNode_modules = path.join(__dirname, '../node_modules');
require('./helpers.js')

const directorio_public = path.join(__dirname, '../public' )
const directorio_views = path.join(__dirname, '../views' )
const directorio_partials = path.join(__dirname, '../partials' )


//body parser
app.use(bodyParser.urlencoded({extended: false}))
//console.log(__dirname)

//hbs y Views
app.set('view engine', 'hbs')
app.use(express.static(directorio_public))
app.set('views', directorio_views)
hbs.registerPartials(directorio_partials)

//Pagina inicio
app.get('/', (req, res) =>{
    res.render('index', {
        titulo:'Inicio'
    })
})
/*
app.get('/calcular', (req, res) => {
    //console.log(req.query);
    res.render('calcular', {
        estudiante: req.body.nombre,
        nota1: parseInt(req.body.nota1),
        nota2: parseInt(req.body.nota2),
        nota3: parseInt(req.body.nota3)
    });
});
*/

app.get('/buscar', (req, res) =>{
    res.render('buscar', {
        titulo: 'Digite le busca al cliente'
    })
})

app.post('/ver', (req, res) => {
    res.render('ver2', {
        titulo: 'Buscar al cliente',
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        pais: req.body.pais,
        nombreCurso: req.body.nombreCurso,
        id: req.body.id,
        costo: req.body.costo
    })
})

app.get('/ver', (req, res) =>{
    res.render('ver', {
        titulo: 'Ver curso',
        //nombre: req.body.nombre,
        //cedula: req.body.cedula,
        //pais: req.body.pais,
        //otro: 'Otro cliente que no tiene datos'
    })

})

app.get('/actualizar', (req, res) =>{
    res.render('actualiza', {
        titulo: 'Actualizar curso',
    })
})

app.post('/actualizar', (req, res) =>{
    funciones.actualizar(
        req.body.cedula,
        req.body.nombre,
        req.body.pais,
        req.body.id,
        req.body.nombreCurso,
        req.body.costo
        )
    res.redirect('/ver')
})

app.post('/eliminar', (req, res) => {
    res.render('eliminar', {
        titulo: 'Eliminar curso',
        cedula: req.body.cedula,
        id: req.body.id
    })
})

app.get('/sesion', (req, res) =>{
    res.render('sesion', {
        titulo: 'Iniciar sesion'
    })

})

app.get('/registrar', (req, res) => {
    res.render('registrar', {
        titulo: 'Crear registrado'
    });
});

app.post('/registrar', (req, res) => {
    res.render('registrar', {
        titulo: 'Crear registrado',
        nombre: req.body.nombre,
        cedula: req.body.cedula,
        pais: req.body.pais        
    })
})

app.post('/crear', (req, res) => {
    res.render('crear', {
        titulo: 'Crear Curso',
        nombreCurso: req.body.nombreCurso,
        id: req.body.id,
        costo: req.body.costo        
    })
})

app.get('/crear', (req, res)=> {
    res.render('crear', {
        titulo: 'Crear curso',
    })
})

//error 404
app.get('*', (req, res) => {
    res.render('error', {
        titulo : 'error 404',
        found: 'No se encontra la pagina web'
    })
})

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000')
})

app.listen(port, () => {
    console.log('Servidor en el puerto '+ port)
})

