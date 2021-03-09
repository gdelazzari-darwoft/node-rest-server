const { request, response } = require("express")

const validarArchivos = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json('Ho hay archivos para subir! - Middelware');
    }
    next();
}

module.exports = {
    validarArchivos
}