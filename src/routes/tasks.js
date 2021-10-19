const express = require('express');
const router = express.Router();

const Task = require('../models/Task');

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json({
       status: 'Tasks saved' 
    });
})

router.put('/tasks/:id', async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Task Updated'
    });
});

router.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Task Deleted'    
    });
});

module.exports = router;