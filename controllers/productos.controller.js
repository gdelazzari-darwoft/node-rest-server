const { response, request } = require("express");
const Producto = require("../models/producto");

//===================================================================================================
//===================================================================================================

// Agregar una nueva categoria con solo el nombre.
const crearProducto = async(req = request, res = response) => {
    const { usuario, ...body } = req.body;

    //Verificar si existe
    const productoDB = await Producto.findOne({ nombre: req.body.nombre });
    if (productoDB) {
        return res.status(400).json({
            msg: "El producto ya existe en la BD!"
        })
    }

    //General la data para grabar en la BD y guardar
    const data = {
        ...body,
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json({
        producto
    });
}

//===================================================================================================
//===================================================================================================

//Obtener categorias, paginado, total de categorias, populate
const listarProductos = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        //Contamos los registros
        Producto.countDocuments(query),

        //Traemos la lista de registros
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde))
    ]);

    res.json({
        msg: 'GET Lista de Productos API - Desde el controller',
        total,
        productos
    });
}

//===================================================================================================
//===================================================================================================

//Obtener una sola cateogira por ID, mas el populate del usuario
const obtenerProductoByID = async(req = request, res = response) => {

    const { id } = req.params;
    const prodcto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json({
        msg: 'GET Producto API - Desde el controller',
        prodcto
    });
}


//===================================================================================================
//===================================================================================================

//Actualizar categoria, por nombre
const actualizarProducto = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'PUT Actualizar Producto API - Desde el controller',
        producto
    });
}


//===================================================================================================
//===================================================================================================

//Borrar categoria - logico - por ID
const borrarProducto = async(req = request, res = response) => {
    const { id } = req.params;

    //Borrado Fisicamente - NO USAR
    //const producto = await Producto.findByIdAndDelete(id);

    //Borrado Logico - Solo se deja en "estado = false"
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'DELETE Producto API - Desde el controller',
        producto
    });
}

//===================================================================================================
//===================================================================================================


module.exports = {
    crearProducto,
    listarProductos,
    obtenerProductoByID,
    actualizarProducto,
    borrarProducto
}