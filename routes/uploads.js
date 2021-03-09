const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/upload.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarCampos, validarArchivos } = require('../middlewares');

const router = Router();

//===================================================================================================
//Cargar Archivo
router.post('/', validarArchivos, cargarArchivos);

//===================================================================================================
//Actualizar Imagen de Usuario y Producto
router.put('/:collecion/:id', [
    validarArchivos,
    check('id', 'El ID debe ser de MongoDB').isMongoId(),
    check('collecion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

//===================================================================================================
router.get('/:collecion/:id', [
    check('id', 'El ID debe ser de MongoDB').isMongoId(),
    check('collecion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);


module.exports = router;