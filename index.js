require('dotenv').config(); //Para establecer variables de Entorno

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de Express
const app = express();

//Configuracion de CORS - Investigar ojo
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//Rutas Principales
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})