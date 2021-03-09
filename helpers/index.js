const dbValidator = require('./db-validators');
const generarJWT = require('./generarJWT');
const googleVerify = require('./google-verify');
const uploadFile = require('./uploadFile');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...uploadFile
}