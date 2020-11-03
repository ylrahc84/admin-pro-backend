const { response } = require('express');

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');

const { googleVerify } = require('../helpers/google-verify');

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


const googleSignin = async(req, res = response) => {

    const googleToken = req.body.token;
    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //Si no existe el Usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '456798',
                img: picture,
                google: true,
                role: 'USER_ROLE'
            })
        } else {

            //Existe el Usuario
            usuario = usuarioDB;
            usuario.google = true;

        }

        //Guardar en DB
        await usuario.save();

        //Generar un TOKEN
        const token = await generaJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch {
        res.status(401).json({
            ok: true,
            msg: 'token no es correcto'
        });
    }
}

module.exports = {
    login,
    googleSignin
}