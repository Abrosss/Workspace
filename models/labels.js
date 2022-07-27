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
    createdBy: {
        type:String
    },
    createdAt: {
        type:String
    },
    projectId: {
        type:String,
        required:true
    },
    description: {
        type:String
    },
    type: {
        type:String
    },
    priority: {
        type:String
    },
    status: {
        type:String
    },
    userId:{
        type:String
    },
    assignTo:{
        type:String
    },
    username:{
        type:String
    },
    notes:{
        type:Array
    },
    todolist:{
        type:Array
    },
    created: { type: Date, default: Date.now }
})

const Ticket = module.exports = mongoose.model("Ticket", TicketSchema)