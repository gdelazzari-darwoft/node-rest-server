const Categoria = require('../models/categoria');
const Producto = require('../models/producto');
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
    //Validar si el ID de usuario existe en la BD
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El ID de Usuario ingresado no existe en la BD');
    }
}

const existeCategoria = async(id = '') => {
    //Validar si el ID de categoria existe en la BD
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error('El ID de Categoria ingresado no existe en la BD');
    }
}

const existeProducto = async(id = '') => {
    //Validar si el ID de categoria existe en la BD
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error('El ID del Producto ingresado no existe en la BD');
    }
}

//Validar Colecciones Permitidas
const coleccionesPermitidas = (coleccion = '', coleccionesPermitidas = []) => {
    const estaIncluida = coleccionesPermitidas.includes(coleccion);
    if (!estaIncluida) {
        throw new Error('La URL no es permitida!');
    }
    return true;
}

module.exports = {
    validarRole,
    validarEmail,
    existeUsuario,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}