const express = require('express')
const project = require('../models/project')
const router = express.Router()
const session = require('express-session')
const passport = require('passport')
const Fs = require('fs')
let Project = require('../models/project')
let Ticket = require('../models/ticket')
let Note = require('../models/notes')
let Todo = require('../models/todolist')
let User = require('../models/user')
const ticket = require('../models/ticket')
const services = require('../services/render.js')
const auth = require('../config/auth')
const isUser = auth.isUser
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');
router.get('/', isUser, services.projects)
router.get('/add-project', services.add_project)

router.post('/add-project', (req, res) => {
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
  res.redirect('/projects')
 })

  
})
router.get('/:id/add-ticket', services.add_ticket)

router.get('/:id', isUser, services.tickets)
router.post('/edit-project/:id', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let id = req.params.id

 let project = new Project({
  title: title,
  description : description
 })

 Project.findById(id, (err, project)=>{
  if(err) return console.log(err)
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
  Project.findByIdAndRemove(req.params.id, err =>{
   Ticket.deleteMany({projectId:req.params.id}, err =>{
   if(err) return console.log(err)
  
   res.redirect('/projects')
   })
  })
 })
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
  res.redirect(`/projects/${id}`)
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

   res.redirect(`/projects/${projectId}`)
  })
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


  //POST edited project

  router.get('/:id/:ticketId', isUser, services.workspace)
  router.post('/:id/:ticketId/reorder', (req, res) =>{
    console.log(req.body)
  })
  router.post('/:id/note', (req, res) => {
    let ticketId = req.params.ticketId
    let content = req.body.projectNote
    let user =req.user._id
    let id = req.params.id
    let status = 'new'
    let noteId = uuidv1().replaceAll('-', '')
  
  //  let note = new Note({
  //   content:content,
  //   ticketId:ticketId,
  //   userId : user,
  //   status: status
  
  //  })
   let newNote = {'noteId': noteId, 'content':content}
   Project.findById({_id:id}, (err, project)=>{
    if(err) return console.log(err)
    
    project.notes.push(newNote)
    project.save(err =>{
      if(err) console.log(err)
      res.redirect(`/projects/${id}`)
     })
   })
 
 
    
   

  
    
  })
  router.post('/:id/:ticketId/add-label', (req, res) => {
    let ticketId = req.params.ticketId
    let content = req.body.projectNote
    let user =req.user._id
    let id = req.params.id
    let label = req.body.label
    console.log(ticketId)
  //  let note = new Note({
  //   content:content,
  //   ticketId:ticketId,
  //   userId : user,
  //   status: status
  
  //  })

   Ticket.findById({_id:ticketId}, (err, ticket)=>{
    if(err) return console.log(err)
    console.log(ticket)
    ticket.label=label
    ticket.labels.push(label)
    ticket.save(err =>{
      if(err) console.log(err)
      res.redirect(`/projects/${id}`)
     })
   })
 
 
    
   

  
    
  })
router.get('/:id/:ticketId/:noteId/notes', (req, res) => {
  let ticketId = req.params.ticketId
  let content = req.body.note
  let user =req.user._id
  let id = req.params.id
  let noteId = req.params.noteId
   
 Ticket.findById({_id:ticketId}, {'todolist': {$elemMatch: {noteId: noteId}}}, (err, note)=>{
  if(err) return console.log(err)
  if(note){
  let noteId = note.todolist[0].noteId
  let content = note.todolist[0].content
  let newNote = {'noteId': noteId, 'content':content}
  
  Ticket.findById({_id:ticketId}, (err, ticket)=>{
    if(err) return console.log(err)
    ticket.notes.push(newNote)
    ticket.save(err =>{
      if(err) console.log(err)
     })
   })
  }
   Ticket.updateOne({ _id: ticketId }, { "$pull": { "todolist": { "noteId": noteId } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)

   res.redirect(`/projects/${id}/${ticketId}`)
});
  // ticket.todolist.push(newNote)
  // ticket.save(err =>{
  //   if(err) console.log(err)
  //   res.redirect(`/projects/${id}/${ticketId}`)
  //  })
 })


})
  
  router.get('/:id/deletenote/:noteId', (req, res) => {
    let id = req.params.id
    let ticketId = req.params.ticketId
    let noteId = req.params.noteId
    Project.updateOne({ _id: id }, { "$pull": { "notes": { "noteId": noteId } }}, { safe: true, multi:true }, function(err, obj) {
      if(err) return console.log(err)
  
     res.redirect(`/projects/${id}`)
  });
   })
  //  router.get('/:id/:ticketId/delete-note/:noteId/notes', (req, res) => {
  //   let id = req.params.id
  //   let ticketId = req.params.ticketId
  //   let noteId = req.params.noteId
  //   Ticket.updateOne({ _id: ticketId }, { "$pull": { "todolist": { "noteId": noteId } }}, { safe: true, multi:true }, function(err, obj) {
  //     if(err) return console.log(err)
  
  //    res.redirect(`/projects/${id}/${ticketId}`)
  // });
  //  })
  //  router.post('/:id/:ticketId/edit-note/:noteId', (req, res) => {
  //   let newcontent = req.body.content
  //   let id = req.params.noteId
  //   let ticketId = req.params.ticketId
  //   let newNote = {'noteId': id, 'content':content}
  //   Project.findById({_id:id}, {'notes': {$elemMatch: {noteId: id}}}, (err, note)=>{
  //     if(err) return console.log(err)
  //     let content = note.notes[0].content
  //     content = newcontent
     
  //    project.notes.push(newNote)
  //    project.save(err =>{
  //      if(err) console.log(err)
  //      res.redirect(`/projects/${id}`)
  //     })
  //   })
  
  //  Note.findById(id, (err, note)=>{
  //   if(err) return console.log(err)
  //   note.content = content
  //   note.save(err =>{
  //     if(err) console.log(err)
  //     res.redirect(`/projects/${id}/${ticketId}`)
  //    })
  //  })
  
   
  
    
  // })


// Triggers console log on change stream
// {_id: '...', operationType: 'insert', ...}
  router.post('/addTodo', (req, res) => {
    
    let ticketId = req.params.ticketId
    let content = req.body.note
    let user =req.user._id
    let id = req.params.id
    let status = 'new'
       
  //  let note = new Note({
  //   content:content,
  //   ticketId:ticketId,
  //   userId : user,
  //   status: status
  
  //  })
   let newNote = {'content':content}
   Ticket.findById({_id:ticketId}, (err, ticket)=>{
    if(err) return console.log(err)
    
    ticket.notes.push(newNote)
    ticket.save(err =>{
      if(err) console.log(err)
      res.redirect(`/projects/${id}/${ticketId}`)
     })
   })
  })
  router.put('/update-status-back', (req, res) => {
    console.log(req.body.status)
    let status = { status: 'todo' };
    Note.findOneAndUpdate(status, { status: req.body.status })
     
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })
  //DELETE PROJECT

 


  
 

 

   //POST add ticket 

  

  
  //EDIT TICKET

 
  
 


  //DELETE TICKET
  

  module.exports = router