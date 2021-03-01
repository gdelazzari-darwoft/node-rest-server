const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/login.controller');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login', [
    check('correo', 'El Correo es obligatorio').isEmail(),
    check('password', 'La Contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

module.exports = router;