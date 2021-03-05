const { response, request } = require("express");
const Categoria = require("../models/categoria");

//===================================================================================================
//===================================================================================================

// Agregar una nueva categoria con solo el nombre.
const crearCategorias = async(req = request, res = response) => {
    const nombre = req.body.nombre.toUpperCase();

    //Verificar si existe
    const categoriaDB = await Categoria.findOne({ nombre });
    if (categoriaDB) {
        return res.status(400).json({
            msg: "La categoria ya existe en la BD!"
        })
    }

    //General la data para grabar en la BD y guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        categoria
    });
}

//===================================================================================================
//===================================================================================================

//Obtener categorias, paginado, total de categorias, populate
const listarCategorias = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        //Contamos los registros
        Categoria.countDocuments(query),

        //Traemos la lista de registros
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        msg: 'GET Lista de Categorias API - Desde el controller',
        total,
        categorias
    });
}

//===================================================================================================
//===================================================================================================

//Obtener una sola cateogira por ID, mas el populate del usuario
const obtenerCategoriaByID = async(req = request, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        msg: 'GET Categoria API - Desde el controller',
        categoria
    });
}


//===================================================================================================
//===================================================================================================

//Actualizar categoria, por nombre
const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'PUT Actualizar Categoria API - Desde el controller',
        categoria
    });
}


//===================================================================================================
//===================================================================================================

//Borrar categoria - logico - por ID
const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params;

    //Borrado Fisicamente - NO USAR
    //const categoria = await Categoria.findByIdAndDelete(id);

    //Borrado Logico - Solo se deja en "estado = false"
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'DELETE API - Desde el controller',
        categoria
    });
}

//===================================================================================================
//===================================================================================================


module.exports = {
    crearCategorias,
    listarCategorias,
    obtenerCategoriaByID,
    actualizarCategoria,
    borrarCategoria
}