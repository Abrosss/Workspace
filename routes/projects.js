const express = require('express')
const router = express.Router()
const axios = require('axios')
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


router.get('/', services.projects)
router.post('/add-project', services.add_project)
router.get('/delete-project/:id', (req, res) => {
  let userId = req.app.locals.userId
  let id = req.params.id
  axios({
    method:'delete',
    url: `https://workspace-bugtracker-api.herokuapp.com/user/${userId}/projects/${id}`
  })
  .then(response=> {
    res.redirect('/projects')}
    )
  .catch(err=>{
      console.log(err)
    })

  
});
router.get('/:id', services.tickets)
router.post('/:id/add-ticket', (req, res) => {
  let title = req.body.title
  let description = req.body.description
  let type = req.body.type
  let priority = req.body.priority
  let status = 'open'
  let id = req.params.id

axios({
  method:'post',
  url: `https://workspace-bugtracker-api.herokuapp.com/projects/${id}/tickets`,
  data: {
    title:title,
    description:description,
    status:status,
    type:type
  }
})
.then(response=> {
  res.redirect(`/projects/${id}`)}
  )
.catch(err=>{
    console.log(err)
  })

  
})


router.get('/:projectId/delete-ticket/:id', (req, res) => {
  let ticketId = req.params.id
  let projectId = req.params.projectId
 
  axios({
    method:'delete',
    url: `https://workspace-bugtracker-api.herokuapp.com/projects/${projectId}/tickets/${ticketId}`
  })
  .then(response=> {
    res.redirect(`/projects/${projectId}`)}
    )
  .catch(err=>{
      console.log(err)
    })

 })

  module.exports = router