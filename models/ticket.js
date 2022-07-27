const mongoose = require('mongoose')


//ticket schema

const TicketSchema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    type: {
        type:String

    },
    projectId: {
        type:mongoose.Schema.Types.ObjectId, ref: 'Project'
    },
    description: {
        type:String
    },
    priority: {
        type:String
    },
    status: {
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    notes:{
        type:Array
    },
    todolist:{
        type:Array
    },
    created: { type: Date, default: Date.now },
    labels:{
        type:Array
    },
    label:{
        type:String
    }
})

const Ticket = module.exports = mongoose.model("Ticket", TicketSchema)