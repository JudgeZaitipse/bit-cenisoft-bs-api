const Ventas = require('./models')

// metodo creacion de Ventas
const createnewVentas = (req, res) => {
  const newVentas = new Ventas(req.body)
  newVentas.save((error, newVentas) => {
    if (error) {
      console.error('Error saving Ventas ', error)
      res.status(500).send(error)
    } else {
      res.send(newVentas)
    }
  })
}

// metodo de consulta de Ventas por id 
const findVentas = (id, res) => {
	// res.status(200).send(id.params.id)
	Ventas.findById(id.params.id, (errors, venta) => {
		if (errors) {
			res.status(500).send(error)
		}else if (venta){
			res.status(200).send(venta)
		}else{
			res.status(404).send({message : ' Ventas Not found'})	
		}
	})
}

// metodo para consulta de los Ventas
const findVentastotal = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Ventas.find(query, (error, ventas) => {
    if (error) {
      res.status(500).send(error)
    }else if (ventas) {
      res.status(200).send({message : ' Informacion Venta ', ventas : ventas})
    }else {
      res.status(404).send({message : ' Ventas Not found'})
    }
  })
}

// metodo para actualiza Ventas 
const VentasUpdate = (id, res) => {
  Ventas.updateOne({ _id: id.params.id }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

// metodo para eliminar una Ventas
const VentasDestroy = (id, res) => {
	Ventas.findByIdAndDelete(id.params.id, (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else if (result) {
			res.status(200).send({message : ' Ventas Eliminada Correctamente',result  : result })
		}else {
			res.status(204).send({message : ' Venta Not found'})
		}
	})
}

// exportacion de metodos al route js 
module.exports = { createnewVentas,findVentas,findVentastotal,VentasUpdate,VentasDestroy }
