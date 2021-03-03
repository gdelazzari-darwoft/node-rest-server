const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

//Login Usuario
const login = async(req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Error al hacer login. No existe el correo ingresado en la BD!"
            })
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Error al hacer login. El usuario no esta activo en la BD!"
            })
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Error al hacer login. El password no es el correcto!"
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'POST Login Usuario',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al hacer login. Hable con el administrador!"
        })
    }
}

const googleSignIn = async(req = request, res = response) => {
    const { id_token } = req.body;
    try {

        const { correo, nombre, img } = await googleVerify(id_token);

        //Verificar si el correo de google ya existe en la BD
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            //Tengo que crear el usuario
            const data = {
                nombre,
                correo,
                password: 'AuthWithGoogle',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario de DB esta desabilitado
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Error al hacer login. El usuario no esta activo en la BD!"
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login de Google!",
            token
        });

    } catch (error) {
        res.status(400).json({
            msg: "Token de Google Invalido!"
        });
    }
}


module.exports = {
    login,
    googleSignIn
}