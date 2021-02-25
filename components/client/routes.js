const express = require('express')
const router = express.Router()
const { createClient,findCliente,findClientes,clienteUpdate,clienteDestroy } = require('./actions')
const Client = require('./model')

// cover de para insercion de parametros 
const multer = require('multer')
const coverUploader = multer({ dest: 'covers/' })
const clienteCover = require('../../middlewares/clienteCover')

// GET by ID
router.get('/find/cliente/:id', findCliente)

// ruta consutla todos lo clients 
router.get('/', findClientes)

// POST Create a Client
router.post('/create', createClient)

// PUT Update a Client's info
router.put('/update/:id', (id,res) =>{

	Client.updateOne({ _id: id.params.id }, id.body, (error, result) => {
		if (error) {
			res.status(422).send(error)
		} else if (result) {
			res.status(200).send({message : ' Cliente Actualizado',result  : result })
		}else {
			res.status(404).send({message : ' Cliente Not found'})
		}
	})
})

// router.put('/update/:id', coverUploader.single('cover'), clienteCover, clienteUpdate)

// DELETE by ID
router.delete('/destroy/:id',clienteDestroy)

module.exports = router
