/*
        Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin, renewToken } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/', [
        check('password', 'El password es obligatorio').not().notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    login);


router.post(
    '/google', [
        check('token', 'El Token  de google es obligatorio').not().notEmpty(),
        validarCampos
    ],
    googleSignin);


router.get('/renew', validarJWT, renewToken);


module.exports = router;