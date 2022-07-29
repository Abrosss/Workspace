const axios = require('axios')
const session = require('express-session')
const passport = require('passport')
const { response } = require('express')
let User = require('../models/user')

const {Project, Ticket, Userdata} = require('../models/project')
exports.projects = (req, res) =>{
  let userId = req.user._id
  let title = ''
  let description = ''
  Project.find({user:userId}).populate({path:'user', select: 'username'})
  .then(data =>{
    res.render('projects', {
      projects: data,
      userId:userId,
      title:title,
    description:description
    })
    
    }
  )
  .catch(err=>{
    console.log(err)
  })
  

        
  
}
exports.add_project = (req, res) =>{
  let title = req.body.title
  let description = req.body.description
  let user =req.user._id

 let project = new Project({
  title: title,
  description : description,
  user : user

 })
 project.save(err =>{
  if(err) console.log(err)
  
 })

 Userdata.findOne({user:user}, (err, data)=>{
  if(err) return console.log(err)
  
  data.projects.push(project._id)
  data.save(err =>{
    if(err) console.log(err)
    res.redirect('/projects')
   })
 })
      }


    
exports.tickets = (req, res) =>{
  let title = ''
    let description = ''
    let type = ''
    let priority = ''
    let status = ''
    let id = req.params.id
    let userId = req.user._id
    Project.find({_id:id}).populate('tickets')
    .then(data =>{
      console.log(data)
      res.render('tickets', {
        project: data,
        userId:userId,
        title:title,
      description:description,
      type:type,
      priority:priority,
      status:status,
      id:id
      })
      }
    )
    .catch(err=>{
      console.log(err)
    })
  

        
    }
    
        
        
       
        