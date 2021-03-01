const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user.controller');
const { validarRole, validarEmail, existeUsuario } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validarCampos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRole, tieneRole } = require('../middlewares/validarRole');

const router = Router();
//===================================================================================================
//===================================================================================================

//Listar Usuarios
router.get('/', usuariosGet);

//===================================================================================================
//===================================================================================================

//Guardar Usuario
router.post('/', [
    //Validar si el usuario tiene todos los datos correctamente 
    //check('correo', 'El correo no es valido!').isEmail(),
    check('correo').custom(validarEmail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN', 'USER']),
    check('rol').custom(validarRole),
    validarCampos
], usuariosPost);
//El parametro [] del medio de la llamada al post, son los middleware

//===================================================================================================
//===================================================================================================

//Actualizar Usuario
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(validarRole),
    validarCampos
], usuariosPut);

//===================================================================================================
//===================================================================================================

//Borrar Usuario
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN', 'VENTAS'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos
], usuariosDelete);


module.exports = router;