const express = require('express');
const router = express.Router();
const tasks = require('../data/tasks.data');

// GET All Tasks
router.get('/', (req, res) => {
    res.json({ success: true, data: tasks });
});

// GET Task by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, data: task });
});

// POST New Task (Data: title, deadline, status)
router.post('/', (req, res) => {
    const { title, deadline, status } = req.body;
    
    // Validasi sederhana
    if (!title || !deadline) {
        return res.status(400).json({ success: false, message: 'Title and Deadline are required' });
    }

    const newTask = {
        id: Date.now(),
        title,
        deadline,
        status: status || 'pending'
    };
    tasks.push(newTask);
    res.status(201).json({ success: true, message: 'Task created', data: newTask });
});

// PUT Update Task
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Task not found' });

    const { title, deadline, status } = req.body;
    tasks[index] = {
        id,
        title: title || tasks[index].title,
        deadline: deadline || tasks[index].deadline,
        status: status || tasks[index].status
    };

    res.json({ success: true, message: 'Task updated', data: tasks[index] });
});

// DELETE Task
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: 'Task not found' });

    tasks.splice(index, 1);
    // Return 204 No Content (Standard REST Delete) atau 200 JSON
    res.json({ success: true, message: 'Task deleted' });
});

module.exports = router;