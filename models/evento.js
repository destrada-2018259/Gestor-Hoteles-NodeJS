const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    precio: {
        type: Number,
        default: 0
    },
    tipoEvento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEvento'
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    }
});

module.exports = model('Evento', EventoSchema);