const express = require('express');
const router = express.Router();

// Importa il controller con tutte le funzioni
const taskController = require('../controllers/taskController');

// 🔹 Rotta per ottenere tutte le task
router.get('/tasks', taskController.getAllTasks);

// 🔹 Rotta per creare una nuova task
router.post('/tasks', taskController.createTask);

// 🔹 Rotta per ottenere una task specifica (tramite ID)
router.get('/tasks/:id', taskController.getTaskById);

// 🔹 Rotta per aggiornare una task specifica (tramite ID)
router.put('/tasks/:id', taskController.updateTask);

// 🔹 Rotta per cancellare una task specifica (tramite ID)
router.delete('/tasks/:id', taskController.deleteTask);

// Esporta il router per poterlo usare in app.js
module.exports = router;
