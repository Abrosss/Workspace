const mongoose = require('mongoose')


//ticket schema

const TodoSchema = mongoose.Schema({
    note: {
        type:Array,
        required:true
    },
    sorting:{
        type:Number
    },
    userId:{
        type:String
    },
    created: { type: Date, default: Date.now }
})

const Todo = module.exports = mongoose.model("Todo", TodoSchema)