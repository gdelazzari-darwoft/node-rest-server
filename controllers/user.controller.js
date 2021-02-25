const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//Listar Usuarios
const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    /*
    const usuarios = await Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde));

    const total = await Usuario.countDocuments(query);
    */

    const [total, usuarios] = await Promise.all([
        //Contamos los registros
        Usuario.countDocuments(query),

        //Traemos la lista de registros
        Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
    ]);
    //Aca utilizamos Promesas para que ambos procesos se ejecuten al mismo tiempo y que sea mas rapido

    res.json({
        msg: 'GET API - Desde el controller',
        total,
        usuarios
    });
}

//===================================================================================================
//===================================================================================================

//Crear Usuario
const usuariosPost = async(req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        msg: 'POST API - Desde el controller',
        usuario
    });
}

//===================================================================================================
//===================================================================================================

//Actualizar Usuario
const usuariosPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, gooogle, ...resto } = req.body;

    //Validar si existe en la BD

    //Si actualizamos el Password, hay que hacer un HASH
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API - Desde el controller',
        usuario
    });
}

//===================================================================================================
//===================================================================================================

//Borrar Usuario
const usuariosDelete = async(req = request, res = response) => {
    const { id } = req.params;

    //Borrado Fisicamente - NO USAR
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Borrado Logico - Solo se deja en "estado = false"
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API - Desde el controller',
        id,
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}