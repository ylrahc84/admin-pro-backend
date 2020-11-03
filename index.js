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

//Directorio PUBLICO
app.use(express.static('public'));

//Rutas Principales
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})