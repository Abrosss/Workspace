const axios = require('axios')
const session = require('express-session')
const passport = require('passport')
const { response } = require('express')
let User = require('../models/user')

exports.projects = (req, res) =>{
  let userId = req.user._id
  let title = ''
  let description = ''
    axios.get('http://localhost:3000/api/projects')
    .then(response=>{
        res.render('projects', {
            projects: response.data,
            userId:userId,
            title:title,
          description:description
          })
    })
    .catch(err=>{
        res.send(err)
    })
}
exports.workspace = (req, res) =>{
  let id = req.params.id
  let ticketId = req.params.ticketId
  let userId = req.user._id
  axios.all([
    axios.get(`http://localhost:3000/api/projects/${id}/tickets`),
    axios.get('http://localhost:3000/api/projects'),
    axios.get(`http://localhost:3000/api/notes/${ticketId}`)
])
.then(axios.spread((obj1,obj2,obj3)=>{

    res.render('workspace', {
        tickets: obj1.data,
        userId:userId,
        id:id,
        projects: obj2.data,
        ticketId:ticketId,
        notes:obj3.data
     
      })
}))
}
exports.add_project = (req, res) =>{
        let title = ''
        let description = ''
    
        res.render('projects/add_project', {
          title:title,
          description:description
        })
      }
     

exports.add_ticket = (req, res) =>{
    console.log(req.user)
    let title = ''
    let description = ''
    let type = ''
    let createdBy = req.user.username
    let priority = ''
    let status = ''
    let assignTo = ''
    let id = req.params.id
    User.find(function (err, users) {
      res.render('projects/add_ticket', {
        title:title,
        description:description,
        type:type,
        createdBy:createdBy,
        priority:priority,
        status:status,
        id: id,
        users:users,
        assignTo:assignTo
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
    
    axios.all([
        axios.get(`http://localhost:3000/api/projects/${id}/tickets`),
        axios.get('http://localhost:3000/api/users'),
        axios.get('http://localhost:3000/api/projects')
    ])
    .then(axios.spread((obj1, obj2, obj3)=>{
      User.find(function (err, users) {
        if(err) console.log(err)
        console.log(users)
        res.render('tickets', {
          title:title,
          description:description,
          type:type,
          priority:priority,
          status:status,
          id: id,
          users:users,
          tickets: obj1.data,
          userId:userId,
          users:obj2.data,
          projects: obj3.data
        })
      })
      
    })

        
    )}
    
        
        
       
        