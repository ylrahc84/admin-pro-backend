require('dotenv').config(); //Para establecer variables de Entorno

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de Express
const app = express();

//Configuracion de CORS - Investigar ojo
app.use(cors());


//Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })

});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})