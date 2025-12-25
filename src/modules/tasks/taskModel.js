const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["done", "in-progress",'todo'],
    default: "todo",
    },
    priority: {
        type: String,
        enum: ['medium', 'low','high'],
        default:'medium'
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
        index:true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    dueDate: {
        type:Date,
    }
},{timestamps:true});

module.exports = mongoose.model('Task', taskSchema);