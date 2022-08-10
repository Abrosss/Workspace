const mongoose = require('mongoose')

//user schema

const UserSchema = mongoose.Schema({
    name: {
        type:String,
    },
    email: {
        type:String,
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    admin: {
        type: Boolean
    }
    
})



const User = module.exports = mongoose.model("User", UserSchema)