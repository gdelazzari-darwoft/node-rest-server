const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    //const params = req.query;
    const { id, nombre } = req.query;
    //con la desestructuracion, podemos poner valores por defecto en cada uno de los parametros que recibimos en el query

    res.json({
        msg: 'GET API - Desde el controller',
        id,
        nombre
    });
}

const usuariosPut = (req = request, res = response) => {
    const id = req.params.id;
    //const {id} = req.params;

    res.json({
        msg: 'PUT API - Desde el controller',
        id
    });
}

const usuariosPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'POST API - Desde el controller',
        nombre,
        edad
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'DELETE API - Desde el controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}