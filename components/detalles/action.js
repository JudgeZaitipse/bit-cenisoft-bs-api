const Detalles = require('./models')

// metodo creacion de destalles
const newDetalle = (req, res) => {
  const newDetalle = new Detalles(req.body)
  newDetalle.save((error, newDetalle) => {
    if (error) {
      console.error('Error saving destalle ', error)
      res.status(500).send(error)
    } else {
      res.send(newDetalle)
    }
  })
}

// metodo de consulta de destalles por id 
const findDestalle = (id, res) => {
	// res.status(200).send(id.params.id)
	Detalles.findById(id.params.id, (errors, detalle) => {
		if (errors) {
			res.status(500).send(error)
		}else if (detalle){
			res.status(200).send(detalle)
		}else{
			res.status(404).send({message : ' destalle Not found'})	
		}
	})
}

// metodo para consulta de los destalles
const findTotalDetalle = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Detalles.find(query, (error, detalles) => {
    if (error) {
      res.status(500).send(error)
    }else if (detalles) {
      res.status(200).send({message : ' Informacion detalles ', detalles : detalles})
    }else {
      res.status(404).send({message : ' detalles Not found'})
    }
  })
}

// metodo para actualiza un detalle 
const detallesUpdate = (id, res) => {
  Detalles.updateOne({ _id: id.params.id }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

// metodo para eliminar un detalle
const detallesDestroy = (id, res) => {
	Detalles.findByIdAndDelete(id.params.id, (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else if (result) {
			res.status(200).send({message : ' destalle Eliminada Correctamente',result  : result })
		}else {
			res.status(204).send({message : ' destalle Not found'})
		}
	})
}

// exportacion de metodos al route js 
module.exports = { newDetalle,findDestalle,findTotalDetalle,detallesUpdate,detallesDestroy }
