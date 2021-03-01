const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');
    //"x-token" es el parametro que se manda en el header, que va a conetener el token de auth

    //Chequeamos que se haya mandado el Token
    if (!token) {
        return res.status(401).json({
            msg: 'No existe el token en el header de la peticion!'
        })
    }

    //Verificamos el JWT
    try {
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //req.uid = uid;

        //Buscar el usuario con UID logueado y guardarlo en el Request
        const usuario = await Usuario.findById(uid);

        //Validar si el usuario existe
        if (!usuario) {
            res.status(401).json({
                msg: 'El usario no existe en la BD!'
            })
        }

        //Verificar si el UID no ha sido borrado (logicamente)
        if (!usuario.estado) {
            res.status(401).json({
                msg: 'El usario esta deshabilitado!'
            })
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido!'
        })
    }
}

module.exports = {
    validarJWT
}