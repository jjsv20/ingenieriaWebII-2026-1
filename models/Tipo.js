const {Schema, model} = require('mongoose');

const GeneroSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        enum: ['Pelicula', 'Serie']
    },
    descripcion: {
        type: String,
        required: true
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

module.exports = model('Tipo', GeneroSchema);