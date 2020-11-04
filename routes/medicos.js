/*
        Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { getMedicos, crearMedicos, actualizarMedicos, borrarMedicos } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = new Router();

router.get('/', validarJWT, getMedicos);

router.post(
    '/', [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().notEmpty(),
        check('hospital', 'El Id del Hospital es obligatorio').isMongoId(),
        validarCampos
    ],
    crearMedicos);

router.put(
    '/:id', [
        validarJWT,
        check('nombre', 'El nombre del Medico es necesario').not().notEmpty(),
        validarCampos
    ],
    actualizarMedicos);

router.delete('/:id', validarJWT, borrarMedicos);

module.exports = router;