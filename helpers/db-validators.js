const Role = require('../models/role');
const Usuario = require('../models/usuario');

const validarRole = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error('El rol ingresado no es valido');
    }
}

const validarEmail = async(correo = '') => {
    //Validar si el correo existe en la BD
    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error('El correo ingresado ya existe en la BD');
    }
}

const existeUsuario = async(id = '') => {
    //Validar si el correo existe en la BD
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El ID ingresado no existe en la BD');
    }
}



module.exports = {
    validarRole,
    validarEmail,
    existeUsuario
}