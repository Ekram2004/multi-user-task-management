const mongoose = require('mongoose');

const teamMemeberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default:'member'
    }
},{timestamps:true});

teamMemeberSchema.index({ userId: 1, teamId: 1 }, { unique: true });

module.exports = mongoose.model('TeamMember', teamMemeberSchema);