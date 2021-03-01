const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo del usuario es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña del usuario es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
    //Basicamente aca, se sacan los dos primeros parametros, y el resto queda en usuario...
    //Despues se imprime el usuario sin los dos parametros
}

module.exports = model('Usuario', UsuarioSchema);