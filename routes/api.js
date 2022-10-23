const express = require('express')
const { Ticket, Project } = require('../models/project')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


//API to work with database, client-server side

//GET ALL USER'S PROJECTS
router.get('/projects', (req, res) => {
  const userId = req.user._id
  const id = req.params.id
  Project.find({user:userId})
  .then(data =>{
   
    if(!data){
      res.status(404).send({message:'no task found'})
    } else{
      res.json(data)
    }
  })
  .catch(err=>{
    res.status(500).send({message:'failed '})
  })
})
//GET ALL PROJECT'S TASKS
router.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    Ticket.find({projectId:id}).populate('projectId')
    .then(data =>{

      if(!data){
        res.status(404).send({message:'no task found'})
      } else{
        res.json(data)
      }
    })
    .catch(err=>{
      res.status(500).send({message:'failed '})
    })
})
//UPDATE THE TASK
router.put('/tasks/:id', (req, res) => {
  const id = req.params.id
    let completed = req.body.completed
    let ticket = new Ticket({
      completed:completed
     })
     Ticket.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a ticket has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })
})
//GET ONE PROJECT 
router.get('/projects/:id', (req, res) => {
  const id = req.params.id
  Project.find({_id:id}).populate('tickets')
  .then(data =>{
    
    if(!data){
      res.status(404).send({message:'no task found'})
    } else{
      res.json(data[0])
    }
  })
  .catch(err=>{
    res.status(500).send({message:'failed '})
  })
})
//UPDATE ONE PROJECT
router.put('/projects/:id', (req, res) => {
  const id = req.params.id
    let progress = req.body.progress
    let project = new Project({
      progress:progress
     })
     Project.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send('a project has been updated')
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })
})
router.put('/:ticketId', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let type = req.body.type
  let priority = req.body.priority
  let status = req.body.status
  let ticketId = req.params.ticketId

 let ticket = new Ticket({
  title:title,
  description : description,
  type:type,
  priority:priority,
  status:status
 })

 Ticket.findByIdAndUpdate(ticketId, req.body,{useFindAndModify:false})
 .then(data =>{
  if(!data){
    res.status(404).send({message: 'cannot update'})
  } else{
    res.send('a ticket has been updated')
  }
 })
 .catch(err =>{
  res.status(500).send({message:'error update user info'})
 })

})
router.post('/:ticketId/addTask', (req, res) => {
    let ticketId = req.params.ticketId
    let content = req.body.content
    let id = req.body.id
    console.log(content)
   let newNote = {"id":id, 'content':content}
   Ticket.findById({_id:ticketId}, (err, ticket)=>{
    if(err) return console.log(err)
    
    ticket.notes.push(newNote)
    ticket.save(err =>{
      if(err) console.log(err)
      res.redirect(`/projects/${ticket.projectId}`)
     })
   })
  
})
module.exports = router
