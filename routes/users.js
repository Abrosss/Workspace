//https://www.youtube.com/watch?v=2jqok-WgelI


const express = require('express')
const project = require('../models/project')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const {registerValidation, loginValidation} = require('../config/validation')
let User = require('../models/user')
const {Userdata} = require('../models/project')


router.get('/register', (req, res) => {
    res.render('register', {
      title:'Register',
      error:req.flash("error")
    })
   
  })

  router.post('/register', async (req, res) => {

     //VALIDATION

    const {error} = registerValidation(req.body, req.body.confirm_password)

    if(error){
    res.status(400)
    res.render('register', {
      error:error.details[0].message,
      title:'register',
      user:null
    })
  }
      

     //check if username exists
    //  const emailExists = await User.findOne({email:req.body.email})
     const usernameExists = await User.findOne({username:req.body.username})
     if(usernameExists) 
      return res.status(400).send('Create a unique username')
      // if(emailExists) return res.status(400).send('Email already exists!')
      // res.redirect('/users/register')
    
    //HASH THE PW

   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(req.body.password, salt)

     //CREATE USER
    
     let user = new User({
      name:req.body.name,
      username:req.body.username, 
      email:req.body.email,
      password:hashPassword,
      admin:false
  })
      let userId = new Userdata({
        user:user._id
      })
           //SAVE USER
    try{
      const savedUser = await user.save()
      const savedId = await userId.save()
      res.redirect('/users/login')
  } catch(err){
      res.status(400).send(err)
  }
        })
       
    

  
  


  router.get('/login', (req, res) => {
    if(res.locals.user) res.redirect('/')
    
    res.render('login', {
      error: req.flash("error"),
      title:'Log in',
      user:req.user
    })
  })


  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/projects',
      failureRedirect: '/users/login',
      failureFlash:true,
      // failureMessage: "Invalid username or password"  STATIC BUT OK

    })(req, res, next)
  })

 
  
  router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/')
    });
    
  })
  module.exports = router