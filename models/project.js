const mongoose = require('mongoose')


//ticket schema

const ProjectSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    user: {
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    notes: {
        type:Array
    },
    labels: {
        type:Array
    },
    created: { type: Date, default: Date.now }
    
})

const Project = module.exports = mongoose.model("Project", ProjectSchema)