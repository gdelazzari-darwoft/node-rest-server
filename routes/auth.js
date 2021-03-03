const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/login.controller');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login', [
    check('correo', 'El Correo es obligatorio').isEmail(),
    check('password', 'La Contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El ID Token es obligato').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;