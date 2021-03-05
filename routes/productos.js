const { Router } = require("express");
const { check } = require("express-validator");

const { crearProducto, listarProductos, obtenerProductoByID, actualizarProducto, borrarProducto } = require("../controllers/productos.controller");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarJWT");
const { esAdminRole } = require("../middlewares/validarRole");


const router = Router();

//===================================================================================================
//Listar las categorias - Publica
router.get('/', listarProductos);

//===================================================================================================
//Obtener una categoria por ID - Publica
router.get('/:id', [
    check('id').custom(existeProducto),
    validarCampos
], obtenerProductoByID);

//===================================================================================================
//===================================================================================================

//Guardar Usuario
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del producto no puede ser vacio!').notEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], crearProducto);

//===================================================================================================
//Actualizar categoria por ID - Privada, con cualquier rol
router.put('/:id', [
    validarJWT,
    check('id').custom(existeProducto),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
], actualizarProducto);

//===================================================================================================
//Borrar categoria por ID - Privada - Solo ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);

//===================================================================================================

module.exports = router;