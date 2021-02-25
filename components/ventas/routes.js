const express = require('express')
const router = express.Router()
const { createnewVentas,findVentas,findVentastotal,VentasUpdate,VentasDestroy } = require('./action')
const Ventas = require('./models')


// GET by ID
router.get('/venta/:id', findVentas)

// ruta consutla todos lo ventas 
router.get('/', findVentastotal)

// POST Create a venta
router.post('/create', createnewVentas)

// PUT Update a venta info
router.put('/update/:id', (id,res) =>{

	Ventas.updateOne({ _id: id.params.id }, id.body, (error, result) => {
		if (error) {
			res.status(422).send(error)
		} else if (result) {
			res.status(200).send({message : ' Venta Actualizado',result  : result })
		}else {
			res.status(404).send({message : ' Venta Not found'})
		}
	})
})

// router.put('/update/:id', coverUploader.single('cover'), clienteCover, clienteUpdate)

// DELETE by ID
router.delete('/destroy/:id',VentasDestroy)

module.exports = router
