const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    descripcion: { type: String, required: true },
    urlImage: String,
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    feCreacion: { type: Date, default: new Date() },
    feModificacion: { type: Date },
    estado: { type: String, default: 'A' }
});

productoSchema.pre('save', function (next) {

    let ahora = new Date();

    this.feModificacion = ahora;

    next();
});

const Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;