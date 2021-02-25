const Client = require('./model')

// metodo creacion de cliente
const createClient = (req, res) => {
  const newClient = new Client(req.body)
  newClient.save((error, clientSaved) => {
    if (error) {
      console.error('Error saving client ', error)
      res.status(500).send(error)
    } else {
      res.send(clientSaved)
    }
  })
}

// metodo de consulta de cliente por id 
const findCliente = (id, res) => {
	// res.status(200).send(id.params.id)
	Client.findById(id.params.id, (errors, cliente) => {
		if (errors) {
			res.status(500).send(error)
		}else if (cliente){
			res.status(200).send(cliente)
		}else{
			res.status(404).send({message : ' Client Not found'})	
		}
	})
}

// metodo para consulta de los clientes
const findClientes = (req, res) => {
  let query = req.query
  if (req.query.name) {
    query = { name: new RegExp(`.*${req.query.name}.*`, 'i') }
  }

  Client.find(query, (error, clientes) => {
    if (error) {
      res.status(500).send(error)
    }else if (clientes) {
      res.status(200).send({message : ' Informacion cliente ', clientes : clientes})
    }else {
      res.status(404).send({message : ' clientes Not found'})
    }
  })
}

// metodo para actualiza cliente 
const clienteUpdate = (id, res) => {
  Client.updateOne({ _id: id.params.id }, req.body, (error, result) => {
    if (error) {
      res.status(422).send(error)
    } else {
      res.send(result)
    }
  })
}

// metodo para eliminar un Cliente
const clienteDestroy = (id, res) => {
	Client.findByIdAndDelete(id.params.id, (error, result) => {
		if (error) {
			res.status(500).send(error)
		} else if (result) {
			res.status(200).send({message : ' Cliente Eliminado Correctamente',result  : result })
		}else {
			res.status(204).send({message : ' clientes Not found'})
		}
	})
}

// exportacion de metodos al route js 
module.exports = { createClient,findCliente,findClientes,clienteDestroy }
