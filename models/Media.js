const {Schema, model} = require('mongoose');

const TipoSchema = new Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    sipnosis: {
        type: String,
        required: true
    },
    url : {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    añoEstreno: {
        type: Number,
        required: true
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Productora',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo',
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

module.exports = model('Media', TipoSchema);