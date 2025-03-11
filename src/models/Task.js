const mongoose = require('mongoose');

// Definizione dello schema del task
const taskSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true // Il titolo è obbligatorio
    },
    description: { 
        type: String // La descrizione è facoltativa
    },
    completed: { 
        type: Boolean, 
        default: false // Di default, il task non è completato
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, // Riferimento a User
        ref: 'User', // Indica quale modello viene referenziato
        required: true // Ogni task deve appartenere a un utente
    }
}, { timestamps: true }); // Aggiunge campi "createdAt" e "updatedAt" automaticamente

// Esportiamo il modello Task
module.exports = mongoose.model('Task', taskSchema);
