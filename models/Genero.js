const {Schema, model} = require('mongoose');

const GeneroSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
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

module.exports = model('Genero', GeneroSchema);