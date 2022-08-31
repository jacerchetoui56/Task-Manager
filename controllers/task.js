const Task = require('../model/task')

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({})
        res.status(200).json({ tasks: allTasks })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    res.send("all items");
};
const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        console.log(error.message)
    }
    res.json({ id: req.params.id });
};
const deleteTask = (req, res) => {
    res.json({ id: req.params.id });
};
const updateTask = (req, res) => {
    res.json(req.body);
};

module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    addTask,
};
