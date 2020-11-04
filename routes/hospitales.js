/*
        Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/', validarJWT, getHospitales);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().notEmpty(),
        validarCampos
    ],
    crearHospital);

router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre del Hospital es necesario').not().notEmpty(),
        validarCampos
    ],
    actualizarHospital);

router.delete('/:id', validarJWT, borrarHospital);

module.exports = router;