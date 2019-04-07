const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const http = require("http");
const process = require("process");

const ProductoController = require("./controller/productoController");
const Producto = require("./models/producto");

let app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/hola/", (req, res) => {
  res.send({ mensaje: "Hellow world! ", persona: req.query });
});

app.get("/hola/:nombre/", (req, res) => {
  res.send({ mensaje: "Hellow world! " + req.params.nombre });
});

app.get("/hola/:nombre/:apellido", (req, res) => {
  res.send({
    mensaje: "Hellow world! " + req.params.nombre + " " + req.params.apellido
  });
});

app.post("/hola", (req, res) => {
  res.send({ mensaje: "Hellow world!", persona: req.body });
});

app.put("/hola", (req, res) => {
  res.send({ mensaje: "Hellow world! Por put", persona: req.body });
});

// RUTAS DE APLICACION

app.get("/productos", (req, res) => {
  ProductoController.get(res);
  // Producto.find({}).then(productos=>{
  //     res.send({data:productos});
  // });
});

app.get("/productos/promesa", (req, res) => {
  ProductoController.getPromise()
    .then(productos => {
      console.log("Promesa");
      res.send({ data: productos });
    })
    .catch(error => res.send({ error }));
  // ProductoController.get();
});

app.post("/producto", (req, res) => {
  ProductoController.insert(req.body, res);
});

app.put("/producto", (req, res) => {
  ProductoController.update(req.body, res);
});

const conn_str = process.env.MONGODB_URI || "mongodb://localhost:27017/ecom";
mongoose.connect(conn_str, { useNewUrlParser: true });

const port = process.env.PORT || "9000";
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Magic Happens on port:${port}`));
