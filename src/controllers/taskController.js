const Task = require('../models/Task');

// 🔹 1. Ottenere tutte le task
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Trova tutte le task nel DB
    res.json(tasks); // Risponde con la lista delle task
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero delle task' });
  }
};

// Crea una nuova task
const createTask = async (req, res) => {
    const { title, description, completed } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        // Crea la task nel database
        const newTask = new Task({
            title,
            description,
            completed: completed || false // Imposta completed a false se non viene passato
        });

        // Salva la task nel database
        const savedTask = await newTask.save();

        // Restituisci la task salvata
        res.status(201).json(savedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Errore nella creazione della task' });
    }
};

// 🔹 3. Ottenere una singola task per ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Cerca la task per ID
    if (!task) return res.status(404).json({ error: 'Task non trovata' });
    res.json(task); // Risponde con la task
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero della task' });
  }
};

// 🔹 4. Aggiornare una task per ID
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Ritorna la task aggiornata
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task non trovata' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: 'Errore nell\'aggiornamento della task' });
  }
};

// 🔹 5. Cancellare una task per ID
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: 'Task non trovata' });
    res.json({ message: 'Task eliminata con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore nell\'eliminazione della task' });
  }
};

// 🔑 Esportiamo tutte le funzioni
module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
