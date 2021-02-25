const mongoose = require('mongoose')

const Detalles = mongoose.model('detalles', { id_libro : String, nombreLibro:String, valorUnitario:String, Cantidad:String })

module.exports = Detalles
