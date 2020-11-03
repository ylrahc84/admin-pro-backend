const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const reqex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: reqex }),
        Medico.find({ nombre: reqex }),
        Hospital.find({ nombre: reqex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    });
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;

    const reqex = new RegExp(busqueda, 'i');

    let data = [];
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: reqex })
                .populate('usuario', 'nombre').populate('hospital', 'nombre');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: reqex })
                .populate('usuario', 'nombre');
            break;
        case 'usuario':
            data = await Usuario.find({ nombre: reqex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msn: 'la Tabla tiene que ser medicos/hospitales/usuarios'
            })
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}