const Task = require('../model/task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require("../errors/custom-error")

const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({})
    res.status(200).json({ tasks: allTasks })
})
const addTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task);
})
const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findById(taskID)
    if (!task) {
        return next(createCustomError(`No Task With ID : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findByIdAndDelete(taskID)
    if (!task) return next(createCustomError(`No Task With ID : ${taskID}`, 404))

    res.status(200).json({ success: true, message: 'Task deleted successfully' })
})
const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true })
    if (!task) return next(createCustomError(`No Task With ID : ${taskID}`, 404))
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    addTask,
};
