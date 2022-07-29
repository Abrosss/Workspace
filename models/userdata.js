const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')




const UserdataSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
    
})



const Userdata = module.exports = mongoose.model("Userdata", UserdataSchema)