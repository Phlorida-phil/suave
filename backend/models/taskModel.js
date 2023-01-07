const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: false
  },
  completed: {
    type: Boolean,
    required: false
  },
  Project: {
  type: mongoose.Schema.Types.ObjectId,
  required: true,
  ref: 'Project'
},
}, {
  timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)
