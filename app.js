const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const config = require('./config/database')
const passport = require('passport')
const cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
const session = require('express-session')
const moment = require('moment');
dotenv.config()

mongoose.connect(config.database)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () =>{
    console.log('connected to mongodb')
})
const app = express()
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.locals.moment = require('moment');    //https://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
    app.use(cookieParser(process.env.SESSION_SECRET)); //same secret with session secret

    app.use(session({
        cookie:{
            secure: true,
            maxAge:60000
               },
        // store: new FileStore(fileStoreOptions),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
      }))
      app.use(require('connect-flash')());
      app.use(function (req, res, next) {
      res.locals.messages = require('express-messages')(req, res);
      next();
  });
  
app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
    });
        require('./config/passport')(passport)
      app.use(passport.initialize())
      app.use(passport.session())
      app.use(function(req, res, next){
          res.locals.user = req.user || null
          next();
        })


        app.get('/', (req, res) => {
            let isAuthenticated = req.isAuthenticated()
           
            res.render('login', {
                isAuthenticated:isAuthenticated,
                error: req.flash("error")
            })
            })
            app.get('/home', (req, res) => {
             
                res.render('index')
                })
        app.get('/profile', (req, res) => {
                res.send('PROFILE WILL BE HERE SOON')
                })
        app.get('/settings', (req, res) => {
                    res.send('PAGE FOR USER SETTINGS')
                    })
      


            const projects = require('./routes/projects.js')

    const users = require('./routes/users.js')


    app.use('/projects', projects)  //THIS IS MAIN

    app.use('/users', users)

            let port = 3000


            app.listen(port, () =>{
                console.log('SERVER RUNNING')
            })