const mongoose = require('mongoose')


//ticket schema

const NoteSchema = mongoose.Schema({
    content: {
        type:String,
        required:true
    },
    ticketId: {
        type:String,
        required:true
    },
    userId:{
        type:String
    },
    status:{
        type:String
    },
    created: { type: Date, default: Date.now }
})

const Note = module.exports = mongoose.model("Note", NoteSchema)