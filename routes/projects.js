const express = require('express')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
const Fs = require('fs')
const services = require('../services/render.js')
const auth = require('../config/auth')
const isUser = auth.isUser
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


const {Project, Ticket, Userdata} = require('../models/project')


router.get('/', isUser, services.projects)
router.post('/add-project', services.add_project)
router.post('/edit-project/:id', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let id = req.params.id

 Project.findById(id, (err, project)=>{
  if(err) return console.log(err)
  console.log(`yay ${title}`)
  project.title = title
  project.description = description
  project._id = id
  project.save(err =>{
    if(err) console.log(err)
    res.redirect('/projects')
   })
 })

 

  
})
router.get('/delete-project/:id', (req, res) => {
  let userId = req.user._id
  let id = req.params.id
   Project.findByIdAndRemove(req.params.id, err =>{
   Ticket.deleteMany({projectId:req.params.id}, err =>{
   if(err) return console.log(err)
  
  
   })
  })

  Userdata.updateOne({ user: userId }, { "$pull": { "projects": { $eq: id } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)
    res.redirect('/projects')
   
});
});
 

 


router.get('/:id', isUser, services.tickets)



router.post('/:id/add-ticket', (req, res) => {
  let username = req.user.username
  let title = req.body.title
  let description = req.body.description
  let type = req.body.type
  let priority = req.body.priority
  let status = 'open'
  let id = req.params.id
  let user = req.user._id

 let ticket = new Ticket({
  title: title,
  projectId:id,
  description : description,
  type:type,
  priority:priority,
  status:status,
  user: user,
  username:username
 })

 ticket.save(err =>{
  if(err) console.log(err)
  
 })
 Project.findOne({_id:id}, (err, data)=>{
  if(err) return console.log(err)
  console.log(`so yourrrr ${data}`)
  data.tickets.push(ticket)
  data.save(err =>{
    if(err) console.log(err)
    res.redirect(`/projects/${id}`)
   })
 })

  
})
router.post('/:projectId/edit-ticket/:id', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let type = req.body.type
  let priority = req.body.priority
  let status = req.body.status
  let id = req.params.id
  let projectId = req.params.projectId
  let assignTo = req.body.assignTo
 let ticket = new Ticket({
  title:title,
  description : description,
  type:type,
  priority:priority,
  status:status,
  assignTo:assignTo
 })

 Ticket.findById(id, (err, ticket)=>{
  if(err) return console.log(err)
  ticket.title = title
  ticket.description = description
  ticket.type = type
  ticket.priority = priority
  ticket.status = status
  ticket.assignTo = assignTo
  ticket.save(err =>{
    if(err) console.log(err)
    res.redirect(`/projects/${projectId}`)
   })
 })

 

  
})
router.get('/:projectId/delete-ticket/:id', (req, res) => {
  let ticketId = req.params.id
  let projectId = req.params.projectId
  Ticket.findByIdAndRemove(ticketId, err =>{
   if(err) return console.log(err)

  
  })

  Project.updateOne({ _id: projectId }, { "$pull": { "tickets": { $eq: ticketId } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)
    res.redirect(`/projects/${projectId}`)
   
});

 })

  // get ADD PROJECTssio
 

  //POST project 

 


  //EDIT PROJECT

  router.get('/edit-project/:id', (req, res) => {
    Project.findOne({_id: req.params.id}, (err, project) =>{
      if(err) return console.log(err)
      res.render('projects/edit_project', {
        title:project.title,
        description:project.description,
        id:project._id
      })

    })

    
  })




 
  

  module.exports = router