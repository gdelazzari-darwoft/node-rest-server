const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',

    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, _id, ...data } = this.toObject();
    return data;
}

module.exports = model('Categoria', CategoriaSchema);