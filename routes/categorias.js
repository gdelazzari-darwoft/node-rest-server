const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategorias, listarCategorias, obtenerCategoriaByID, actualizarCategoria, borrarCategoria } = require('../controllers/categorias.controller');
const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validarRole');


const router = Router();
/*
{{url}}/api/categorias
*/

//===================================================================================================
//Listar las categorias - Publica
router.get('/', listarCategorias);

//===================================================================================================
//Obtener una categoria por ID - Publica
router.get('/:id', [
    check('id').custom(existeCategoria),
    validarCampos
], obtenerCategoriaByID);

//===================================================================================================
//Crear nueva - Privada, con cualquier rol, pero con Token
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoria no puede ser vacio!').notEmpty(),
    validarCampos
], crearCategorias);

//===================================================================================================
//Actualizar categoria por ID - Privada, con cualquier rol
router.put('/:id', [
    validarJWT,
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre de la categoria no puede ser vacio!').notEmpty(),
    validarCampos
], actualizarCategoria);

//===================================================================================================
//Borrar categoria por ID - Privada - Solo ADMIN
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);

module.exports = router;