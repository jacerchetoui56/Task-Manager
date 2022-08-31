const express = require('express')
const { getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    addTask } = require('../controllers/task')
const router = express.Router()
router.use(express.json())

router.route('/').get(getAllTasks).post(addTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router