const validaCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validaRoles = require('../middlewares/validarRole');
const validarArchivos = require('../middlewares/validarArchivos');

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivos
}