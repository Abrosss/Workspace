const axios = require('axios')
const session = require('express-session')
const passport = require('passport')
const { response } = require('express')
let User = require('../models/user')

const {Project, Ticket, Userdata} = require('../models/project')


exports.projects = (req, res) =>{
  let userId = req.app.locals.userId
  let title = ''
  let description = ''
  axios.get(`https://workspace-bugtracker-api.herokuapp.com/user/${userId}/projects`)
  .then(response =>{
    res.render('projects', {
      projects: response.data,
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
  let userId = req.app.locals.userId
axios({
  method:'post',
  url: `https://workspace-bugtracker-api.herokuapp.com/user/${userId}/projects`,
  data: {
    title:title,
    description:description,
    user:userId
  }
})
.then(response=> {
  res.redirect('/projects')}
  )
.catch(err=>{
    console.log(err)
  })

      }


    
exports.tickets = (req, res) =>{
  let title = ''
    let description = ''
    let type = ''
    let priority = ''
    let status = ''
    let id = req.params.id
    let userId = req.app.locals.userId
    axios.get(`https://workspace-bugtracker-api.herokuapp.com/projects/${id}`)
    .then(response =>{
      console.log(response.data)
      res.render('tickets', {
        project: response.data,
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
    
        
        
       
        