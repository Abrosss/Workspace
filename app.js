const express = require('express')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const passport = require('passport')
const cookieParser = require('cookie-parser')
var expressValidator = require('express-validator');
const session = require('express-session')
const moment = require('moment');
dotenv.config()

mongoose.connect(process.env.DB_STRING) //< database string from .env file
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
        // store: new FileStore(fileStoreOptions),
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: true
      }))
      app.use(require('connect-flash')());
      app.use(function (req, res, next) {
      res.locals.messages = require('express-messages')(req, res);
      next();
  });
        require('./config/passport')(passport)
      app.use(passport.initialize())
      app.use(passport.session())
      app.use(function(req, res, next){
          res.locals.user = req.user || null
          next();
        })


        app.get('/', (req, res) => {
           
            res.render('login', {
                error: req.flash("error")
            })
            })
        app.get('/register', (req, res) => {
                res.render('register', {
                  title:'Register',
                  error:req.flash("error")
                })
               
              })
          app.get('/login', (req, res) => {
                if(res.locals.user) res.redirect('/')
                
                res.render('login', {
                  error: req.flash("error"),
                  title:'Log in',
                  user:req.user
                })
              })
          app.get('/home', (req, res) => {
             
                res.render('pages/dashboard')
                })
          app.get('/workspace', (req, res) => {
             
                res.render('pages/workspace')
                })
        app.get('/profile', (req, res) => {
                res.send('PROFILE WILL BE HERE SOON')
                })
        app.get('/settings', (req, res) => {
                res.render('settings')
                    })
        app.get('/trash', (req, res) => {
                res.send('TRASHY TRASH HERE')
                        })


            const projects = require('./routes/projects.js')

            const users = require('./routes/users.js')

            const api = require('./routes/api.js')



    app.use('/projects', projects)  //THIS IS MAIN

    app.use('/users', users)

    app.use('/api', api)

            const PORT = process.env.PORT || 5000


            app.listen(PORT, () =>{
                console.log('SERVER RUNNING')
            })