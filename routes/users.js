//https://www.youtube.com/watch?v=2jqok-WgelI


const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const {registerValidation, loginValidation} = require('../config/validation')
let User = require('../models/user')
const {Userdata} = require('../models/project')




  router.post('/register', async (req, res) => {

      //VALIDATION
 
     const {error} = registerValidation(req.body, req.body.confirm_password)
 
     if(error) 
     return res.render('register', {
      error:error.details[0].message
    })

   
      //check if username exists
     //  const emailExists = await User.findOne({email:req.body.email})
      const usernameExists = await User.findOne({username:req.body.username})
      if(usernameExists) 
      return res.render('register', {
        error:'Create a unique username'
      })
       // if(emailExists) return res.status(400).send('Email already exists!')
 
     
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
       await user.save()
       await userId.save()
       res.redirect(`/login`)
   } catch(err){
    console.log(err)
   }
   
  })
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/projects',
      failureRedirect: '/login',
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