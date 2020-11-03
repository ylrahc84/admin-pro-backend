const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generaJWT } = require('../helpers/jwt');
const { Promise } = require('mongoose');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    //const usuario = await Usuario.find({}, 'nombre email role').skip(desde).limit(5);

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { password, email } = req.body;

    try {
        const existeMail = await Usuario.findOne({ email });

        if (existeMail) {
            return res.status(400).json({
                ok: false,
                msn: 'El correo ya existe en la DB'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        //Guardamos el Usuario
        await usuario.save();

        //Generar TOKEN
        const token = await generaJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msn: 'Error inesperado...'
        });
    }
}

const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id; //Asi recibimos el Paramentro ID

    try {

        const usuarioDb = await Usuario.findById(uid);

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msn: 'El Usuario no existe en la DB'
            })
        }
        //Actualizar Usuario -  con la destructuracion borramos ambos parametros del cuerpo
        const { password, google, email, ...campos } = req.body;

        if (usuarioDb.email !== email) {

            const existeEmail = await Usuario.findOne({ email })
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msn: 'Existe un Usuario con ese Email'
                })
            }

        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msn: 'Error inesperado...'
        });
    }
}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id; //Asi recibimos el Paramentro ID

    try {

        const usuarioDb = await Usuario.findById(uid);
        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msn: 'El Usuario no existe en la DB'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msn: 'Usuario Eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msn: 'Error inesperado...'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}