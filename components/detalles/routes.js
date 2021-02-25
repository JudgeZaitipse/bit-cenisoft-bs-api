const express = require('express')
const router = express.Router()
const { newDetalle,findDestalle,findTotalDetalle,detallesUpdate,detallesDestroy } = require('./action')
const Detalles = require('./models')


// GET by ID
router.get('/detalle/:id', findDestalle)

// ruta consutla todos lo Detalles
router.get('/', findTotalDetalle)

// POST Create a Detalles
router.post('/create', newDetalle)

// PUT Update a Detalles info
router.put('/update/:id', (id,res) =>{

	Detalles.updateOne({ _id: id.params.id }, id.body, (error, result) => {
		if (error) {
			res.status(422).send(error)
		} else if (result) {
			res.status(200).send({message : ' detalle Actualizado',result  : result })
		}else {
			res.status(404).send({message : ' detalle Not found'})
		}
	})
})

// router.put('/update/:id', coverUploader.single('cover'), clienteCover, clienteUpdate)

// DELETE by ID
router.delete('/destroy/:id',detallesDestroy)

module.exports = router
