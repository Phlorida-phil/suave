const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')

const getTasks = asyncHandler(async(req, res) => {
  const tasks = await Task.find()

  res.status(200).json(tasks)
})

const createTask = asyncHandler(async(req, res) => {
  const {description, cost, duration, start, Project, completed} = req.body

  if(!description || !cost || !duration || !Project){
    res.status(400)
    throw new Error('Please include all Reuired items')
  }

  const task = await Task.create({
    description,
    cost,
    duration,
    start,
    Project,
    completed
  })

  res.status(200).json(task)
})

const updateTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)

  if(!Task){
    res.status(400)
    throw new Error('No task found')
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})


  res.status(200).json(updatedTask)
})

const deleteTask = asyncHandler(async(req, res) => {
  const task = await Task.findById(req.params.id)

  if(!Task){
    res.status(400)
    throw new Error('No Task Found')
  }

  await task.remove()

  res.status(200).json({id: req.params.id})
})

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}
