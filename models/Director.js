const {Schema, model} = require('mongoose');

const GeneroSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['activo', 'inactivo'],
    },
    fechaCreacion: {
        type: Date,
        required: false,
    },
    fechaActualizacion: {
        type: Date,
        required: false,
    }
});

module.exports = model('Director', GeneroSchema);