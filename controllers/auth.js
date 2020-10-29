const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            res.status(400).json({
                ok: true,
                msn: 'Email no valido'
            })
        }

        //Verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            res.status(400).json({
                ok: true,
                msn: 'Contraseña no es valido'
            })
        }

        //Generar un TOKEN
        const token = await generaJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch { error } {
        console.log(error);
        res.status(500).json({
            ok: false,
            msn: 'Error inesperado...'
        });
    }

}


module.exports = {
    login
}