const dotenv = require('dotenv')
dotenv.config()

module.exports ={
    database: `mongodb+srv://nessi:${process.env.PASSWORD}@cluster0.dldmh.mongodb.net/bugtracker?retryWrites=true&w=majority`
}

