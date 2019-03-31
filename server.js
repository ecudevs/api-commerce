const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const http = require("http");
const process = require("process");

let app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/hola/', (req, res) => {
    res.send({ mensaje: 'Hellow world! ', persona: req.query })
});

app.get('/hola/:nombre/', (req, res) => {
    res.send({ mensaje: 'Hellow world! ' + req.params.nombre })
});

app.get('/hola/:nombre/:apellido', (req, res) => {
    res.send({ mensaje: 'Hellow world! ' + req.params.nombre + ' ' + req.params.apellido })
});

app.post('/hola', (req, res) => {
    res.send({ mensaje: 'Hellow world!', persona: req.body })
});

app.put('/hola', (req, res) => {
    res.send({ mensaje: 'Hellow world! Por put', persona: req.body })
});

// RUTAS DE APLICACION

app.get('/productos', (req, res) => {
    res.send({
        productos: [
            {
                id: 1,

                urlImage: 'https://http2.mlstatic.com/cerveza-corona-D_NQ_NP_979411-MLC20550406761_012016-F.jpg',

                descripcion: 'Cervezas desde back refreshed',
                precio: 2,
                stock: 5,
                categoria: 'BEBIDAS'
            },
            {
                id: 2,
                descripcion: 'Cervezas 1',
                urlImage: 'https://http2.mlstatic.com/cerveza-corona-D_NQ_NP_979411-MLC20550406761_012016-F.jpg',
                precio: 2,
                stock: 5,
                categoria: 'BEBIDAS'
            },
            {
                id: 3,
                descripcion: 'Cervezas 2',
                urlImage: 'https://http2.mlstatic.com/cerveza-corona-D_NQ_NP_979411-MLC20550406761_012016-F.jpg',
                precio: 2,
                stock: 5,
                categoria: 'BEBIDAS'
            },
            {
                id: 4,
                descripcion: 'Cervezas 2',
                urlImage: 'https://http2.mlstatic.com/cerveza-corona-D_NQ_NP_979411-MLC20550406761_012016-F.jpg',
                precio: 2,
                stock: 5,
                categoria: 'BEBIDAS'
            }
        ]
    })
});


const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port:${port}`));