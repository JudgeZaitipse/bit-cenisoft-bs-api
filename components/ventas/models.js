const mongoose = require('mongoose')

const Ventas = mongoose.model('Ventas', { fecha: { type:Date, default: Date.now }, total : String,
	  id_clente:String })

module.exports = Ventas
