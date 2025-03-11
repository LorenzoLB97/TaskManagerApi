const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id; // Assumiamo che l'utente sia autenticato

        const newTask = new Task({
            title,
            description,
            user: userId
        });

        await newTask.save();

        res.status(201).json(newTask); // Rispondiamo con il task creato
    } catch (error) {
        res.status(500).json({ message: 'Errore nella creazione del task' });
    }
};

const getTasks = async (req, res) => {
    try {
        const userId = req.user.id;

        const tasks = await Task.find({ user: userId }); // Trova task dell'utente

        res.json(tasks); // Ritorna lista di task
    } catch (error) {
        res.status(500).json({ message: 'Errore nel recupero dei task' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        const userId = req.user.id;

        const task = await Task.findOneAndUpdate(
            { _id: id, user: userId }, // Trova solo se appartiene a quell'utente
            { title, description, completed },
            { new: true } // Ritorna il task aggiornato
        );

        if (!task) return res.status(404).json({ message: 'Task non trovato' });

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'aggiornamento del task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const task = await Task.findOneAndDelete({ _id: id, user: userId });

        if (!task) return res.status(404).json({ message: 'Task non trovato' });

        res.json({ message: 'Task eliminato con successo' });
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'eliminazione del task' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};
