const express = require('express')

const router = express.Router()
const session = require('express-session')
let Ticket = require('../models/ticket')
let Project = require('../models/project')
router.get('/', (req, res) => {

    Ticket.find({userId:req.user._id}, (err, tickets) =>{
      if(err) return console.log(err)
      res.render('projects/all_tickets', {
        tickets: tickets
      })
    })
  })

  //get ADD TICKER
  // router.get('/add-ticket', (req, res) => {
  //   let title = ''
  //   let description = ''
  //   let type = ''
  //   let priority = ''
  //   let status = ''

  //   res.render('projects/add_ticket', {
  //     title:title,
  //     description:description,
  //     type:type,
  //     priority:priority,
  //     status:status,
  //     id: project._id
  //   })
  // })

  // //POST add ticket 

  // router.post('/add-ticket', (req, res) => {
  //   let title = req.body.title
  //   let description = req.body.description
  //   let type = req.body.type
  //   let priority = req.body.priority
  //   let status = req.body.status
    
  //  let ticket = new Ticket({
  //   title: title,
  //   description : description,
  //   type:type,
  //   priority:priority,
  //   status:status
  //  })

  //  ticket.save(err =>{
  //   if(err) console.log(err)
  //   res.redirect('/tickets')
  //  })

    
  // })


  // //EDIT TICKET

  // router.get('/edit-ticket/:id', (req, res) => {
  //   Ticket.findById(req.params.id, (err, ticket) =>{
  //     if(err) return console.log(err)
  //     res.render('projects/edit_ticket', {
  //       title:ticket.title,
  //       description:ticket.description,
  //       type:ticket.type,
  //       priority:ticket.priority,
  //       status:ticket.status,
  //       id:ticket._id
  //     })

  //   })

    
  // })


  // //POST edited ticket

  // router.post('/edit-ticket/:id', (req, res) => {
  //   let title = req.body.title
  //   let description = req.body.description
  //   let type = req.body.type
  //   let priority = req.body.priority
  //   let status = req.body.status
  //   let id = req.params.id

  // //  let project = new Project({
  // //   name: name,
  // //   description : description
  // //  })

  //  Ticket.findById(id, (err, ticket)=>{
  //   if(err) return console.log(err)
  //   ticket.title = title
  //   ticket.description = description
  //   ticket.type = type
  //   ticket.priority = priority
  //   ticket.status = status
  //   ticket._id = id
  //   ticket.save(err =>{
  //     if(err) console.log(err)
  //     res.redirect('/tickets')
  //    })
  //  })

   

    
  // })



  // //DELETE TICKET

  // router.get('/delete-ticket/:id', (req, res) => {
  //  Ticket.findByIdAndRemove(req.params.id, err =>{
  //   if(err) return console.log(err)

  //   res.redirect('/tickets/')
  //  })
  // })
  module.exports = router