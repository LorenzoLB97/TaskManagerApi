const mongoose = require('mongoose');

// Definiamo lo schema per l'utente
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });  // timestamps aggiunge "createdAt" e "updatedAt"

// Creiamo il modello User
module.exports = mongoose.model('User', userSchema);
