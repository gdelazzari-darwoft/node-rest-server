const { request, response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const path = require("path")
const fs = require("fs");
const { Usuario, Producto } = require("../models");


const cargarArchivos = async(req = request, res = response) => {

    try {
        const pathArchivo = await subirArchivo(req.files, undefined, 'images');
        //        const pathArchivo = await subirArchivo(req.files, ['txt', 'md'], 'txt');
        res.json({
            path: pathArchivo
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

//===================================================================================================
const actualizarImagen = async(req = request, res = response) => {

    const { id, collecion } = req.params;
    let modelo;

    switch (collecion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe usuario con el ID ingresado!'
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe producto con el ID ingresado!'
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Opcion no validada!' });
    }

    //Limpiar Imagenes Previas
    try {
        if (modelo.img) {
            //Borrar la imagen de previa
            const filePath = path.join(__dirname, '../uploads', collecion, modelo.img);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
    } catch (error) {}

    const pathArchivo = await subirArchivo(req.files, undefined, collecion);
    modelo.img = pathArchivo;

    await modelo.save();

    res.json({ modelo });
}

//===================================================================================================
const actualizarImagenCloudinary = async(req = request, res = response) => {
    const { id, collecion } = req.params;
    let modelo;

    switch (collecion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe usuario con el ID ingresado!'
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe producto con el ID ingresado!'
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Opcion no validada!' });
    }

    //Limpiar Imagenes Previas de Cloudinary
    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombreImg = nombreArr[nombreArr.length - 1];
        const [public_id] = nombreImg.split('.');

        await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;
    await modelo.save();

    res.json({ modelo });
}

//===================================================================================================
const mostrarImagen = async(req = request, res = response) => {
    const { id, collecion } = req.params;
    let modelo;

    switch (collecion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe usuario con el ID ingresado!'
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: 'No existe producto con el ID ingresado!'
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Opcion no validada!' });
    }

    if (modelo.img) {
        const filePath = path.join(__dirname, '../uploads', collecion, modelo.img);
        if (fs.existsSync(filePath)) {
            return res.sendFile(filePath);
        }
    }

    const noImagePath = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(noImagePath);
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}