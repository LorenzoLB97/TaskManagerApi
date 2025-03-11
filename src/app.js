const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Configura dotenv
dotenv.config();

// Connessione al database MongoDB
connectDB();

const app = express();

// Middleware per parsing JSON
app.use(express.json());

// Rotta di esempio
app.get('/', (req, res) => {
    res.send('API Task Manager funzionante ✅');
});

// Porta di ascolto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server attivo sulla porta ${PORT} 🚀`);
});

// Importa le route delle task
const taskRoutes = require('./routes/taskRoutes');

// Usa le route per le task
app.use('/api', taskRoutes);