const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            busqueda: '/api/busqueda'
        }

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
        //Aca se configura cada ruta con su route correspondiente

        //Login
        this.app.use(this.paths.auth, require('../routes/auth'));

        //CRUD de Usuarios
        this.app.use(this.paths.usuarios, require('../routes/user'));

        //CRUD de Categorias
        this.app.use(this.paths.categorias, require('../routes/categorias'));

        //CRUD de Productos
        this.app.use(this.paths.productos, require('../routes/productos'));

        //Busquedas
        this.app.use(this.paths.busqueda, require('../routes/busqueda'))

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el pueto', this.port);
        });
    }
}

module.exports = Server;