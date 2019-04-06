
const Producto = require('../models/producto');
const ObjectId = require('mongoose').Types.ObjectId;

function ProductoController() {
    this.get = function (res){
        Producto.find({estado:'A'}).then(productos=>{
            res.send({productos: productos});
        });
    }
    
    this.getPromise = function(){
        return new Promise((resolve, reject)=>{
            Producto.find({ estado: 'A' }).then(productos => {
                resolve(productos);
            }).catch(error=>{
                reject(error);
            })
        })
    }

    this.insert = function(producto, res){
        new Producto(producto).save().then(productoCreado=>{
            res.send({sucess:true, data: productoCreado});
        }).catch(error=>{
            res.send({sucess:false, error})
        })
    }

    this.update = function (producto, res) {
        Producto.findByIdAndUpdate(ObjectId(producto._id), producto).then(productoModificado=>{
            res.send({producto:productoModificado});
        })
    }
}

module.exports  = new ProductoController();