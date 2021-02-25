const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Conectado Correctamente a la Base de Datos');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar a la Base de Datos')
    }
}

module.exports = {
    dbConnection
}