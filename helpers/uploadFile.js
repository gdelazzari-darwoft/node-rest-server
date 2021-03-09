const path = require('path');
const { v4: uuidv4 } = require('uuid');

const extensionesValidasPorDefecto = ['jpeg', 'png', 'jpg', 'gif'];

const subirArchivo = (files, extensionesValidas = extensionesValidasPorDefecto, folder = '') => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar extension del archivo
        if (!extensionesValidas.includes(extension)) {
            return reject('La extension del archivo no es valida!');
            /* return res.status(400).json({
                msg: 'La extension del archivo no es valida!'
            }); */
        }

        const nombreTemp = uuidv4() + "." + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject({ err });
            }

            resolve(nombreTemp);
        });
    });
}

module.exports = {
    subirArchivo
}