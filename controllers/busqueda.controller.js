const { response, request } = require("express");
const { ObjectId } = require('mongoose').Types;
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const Role = require('../models/role');


const coleccionesPermitidas = [
    'productos',
    'categorias',
    'usuarios',
    'roles'
];

const buscar = (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `La coleccion de busqueda no es valida!\nLas colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;

        case 'roles':
            buscarRoles(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Error en el servidor!'
            });
    }
}

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        //Busqueda por ID
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        });
    } else {
        //Busqueda por Nombre
        const regex = new RegExp(termino, 'i')
        const usuarios = await Usuario.find({
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
        });
        res.json({
            results: usuarios
        });
    }
}

const buscarProductos = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        //Busqueda por ID
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        res.json({
            results: (producto) ? [producto] : []
        });
    } else {
        //Busqueda por Nombre
        const regex = new RegExp(termino, 'i')
        const productos = await Producto.find({
            $or: [{ nombre: regex }],
            $and: [{ estado: true }]
        }).populate('categoria', 'nombre');
        res.json({
            results: productos
        });
    }
}

const buscarCategorias = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        //Busqueda por ID
        const categoria = await Categoria.findById(termino);
        res.json({
            results: (categoria) ? [categoria] : []
        });
    } else {
        //Busqueda por Nombre
        const regex = new RegExp(termino, 'i')
        const categorias = await Categoria.find({
            $or: [{ nombre: regex }],
            $and: [{ estado: true }]
        });
        res.json({
            results: categorias
        });
    }
}

const buscarRoles = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if (esMongoId) {
        //Busqueda por ID
        const rol = await Role.findById(termino);
        res.json({
            results: (rol) ? [rol] : []
        });
    } else {
        //Busqueda por Nombre
        const regex = new RegExp(termino, 'i')
        const roles = await Role.find({
            $or: [{ nombre: regex }],
        });
        res.json({
            results: roles
        });
    }
}

module.exports = {
    buscar
}