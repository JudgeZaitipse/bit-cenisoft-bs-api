const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = require('./config') // instacia archivo del puerto del servidor local y coneccion db 

// Carga y abre la conexión con la base de datos
require('./db')

// Rutas
const bookRoutes = require('./components/book/routes')
const clientRoutes = require('./components/client/routes')
const VentasRoutes = require('./components/ventas/routes')
const DestallesRoutes = require('./components/detalles/routes')

// Middleware para permitir recibir solicitudes HTTP desde cualquier dominio
app.use(cors())

// Middleware para leer datos en JSON desde el body de la petición
app.use(bodyParser.json())

// Instalación de rutas en el router principal
app.use('/books', bookRoutes)
app.use('/clients', clientRoutes)
app.use('/ventas', VentasRoutes)
app.use('/destalles', DestallesRoutes)
app.use('/covers', express.static('covers'))

// puerto del servidor 
app.listen(PORT, () => {
  console.log(`Server APP listening at localhost:${PORT}`)
})
