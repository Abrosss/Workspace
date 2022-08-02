//https://www.youtube.com/watch?v=2jqok-WgelI


const express = require('express')
const axios = require('axios')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
// const {registerValidation, loginValidation} = require('../config/validation')
// const {Userdata} = require('../models/project')




  router.post('/register', (req, res) => {

     let name = req.body.name
     let username = req.body.username
     let email = req.body.email
     let password =req.body.password
     let confirm_password = req.body.confirm_password
     let admin = false

     axios({
      method:'post',
      url: `https://workspace-bugtracker-api.herokuapp.com/user/register`,
      data: {
        username:username,
        password:password,
        confirm_password:confirm_password
      }
    })
    .then(response=> {
      res.redirect(`/login`)}
      )
    .catch(err=>{
        console.log(err)
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

 
  
  // router.get('/logout', (req, res) => {
  //   req.logout(function(err) {
  //     if (err) { return next(err); }
  //     res.redirect('/projects')
  //   });
    
  // })
  module.exports = router