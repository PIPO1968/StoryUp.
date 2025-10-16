const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario: String, // nick o email
    texto: String,
    fecha: { type: Date, default: Date.now }
});

const historiaSchema = new mongoose.Schema({
    titulo: String,
    contenido: String,
    autor: String, // nick o email
    tipo: String,
    modo: String,
    likes: { type: Number, default: 0 },
    comentarios: [comentarioSchema],
    creada: { type: Date, default: Date.now },
    actualizada: { type: Date, default: Date.now }
}, { collection: 'historias' });

module.exports = mongoose.model('Historia', historiaSchema);