const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        //Conectar a Base de Datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas 
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y Parseo del Body
        this.app.use(express.json());
        //aca todo lo que viene en POST, PUT, DELETE viene en formato de JSON

        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        //Configurar routes

        this.app.use('/api/usuarios', require('../routes/user'));
        //aca lo que hacemos es decir que para la ruta "/api/usuarios" se usa el route configurado en "../routes/user"
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el pueto', this.port);
        });
    }
}

module.exports = Server;