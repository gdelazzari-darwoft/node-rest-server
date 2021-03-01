const { request, response } = require("express")

const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'No se puede validar el role del usuario sin el Token!'
        })
    }

    const { rol } = req.usuario;
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: 'El rol del usuario logueado no puede ejecutar esta accion!'
        })
    }
    next();
}

const tieneRole = (...roles) => {
    //Con el "...roles", lo que hacemos es tomar todos los parametros y crear un array de parametros
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se puede validar el role del usuario sin el Token!'
            })
        }
        const { rol } = req.usuario;
        if (!roles.includes(rol)) {
            return res.status(401).json({
                msg: 'El rol del usuario logueado no puede ejecutar esta accion!'
            })
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}