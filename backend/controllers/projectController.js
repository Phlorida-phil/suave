const asyncHandler = require('express-async-handler')
const Project = require('../models/projectModel')

const getProjects = asyncHandler(async(req, res) => {
  const projects = await Project.find()

  res.status(200).json(projects)
})

const createProject = asyncHandler(async(req, res) => {
  const {name, budget} = req.body

  if(!name){
    res.status(400)
    throw new Error('Please include all Required items')
  }

  const project = await Project.create({
    name,
    budget
  })

  res.status(200).json(project)
})

const updateProject = asyncHandler(async(req, res) => {
  const project = await Project.findByID(req.params.id)

  if(!Project){
    res.status(400)
    throw new Error('Project not Found')
  }

  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {new:true})

  res.status(200).json(updatedProject)
})

const deleteProject = asyncHandler(async(req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id)

  if(!Project){
    res.status(400)
    throw new Error('Project not Found')
  }

  await project.remove

  res.status(200).json({ id: req.params.id})
})

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
}
