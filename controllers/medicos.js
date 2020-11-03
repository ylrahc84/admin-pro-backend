const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre')

    res.json({
        ok: true,
        medicos
    });
}

const crearMedicos = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msn: 'Error inesperado...'
        });
    }
}

const actualizarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Actualizar Medicos'
    });
}

const borrarMedicos = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'Borrar Medicos'
    });
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}