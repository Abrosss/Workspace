
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
let Project = require('../models/project')
let Ticket = require('../models/ticket')
let User = require('../models/user')
const {registerValidation, loginValidation} = require('../config/validation')
//PROJECTS
router.get('/projects', (req, res) => {

    if(req.query.id){
      const id = req.query.id
      Project.findById(id)
      .then(data =>{
        if(!data){
          res.status(404).send({message:'no project found'})
        } else{
          res.send(data)
        }
      })
      .catch(err=>{
        res.status(500).send({message:'failed '})
      })
  
    }
  
  
      Project.find({}).sort({sorting:1})
      .populate('user', 'username')
      .then(project =>{
        res.send(project)
      
      })
      .catch(err =>{
        res.status(500).send({message:err.message || 'ERROR'})
      })
  
  
      
    })

router.post('/projects', (req, res) => {

        if(!req.body.title){
          res.status(400).send({message:'what is the name of the project?'})
          return
        }
        let title = req.body.title
        let description = req.body.description
    
       let project = new Project({
        title: title,
        description : description
    
       })
    
       project
       .save(project)
       .then(data=>{
        res.send(data)
       })
       .catch(err=>{
        res.status(500).send({
          message:err.message|| 'some error occurred, try again'
        })
       })
    
        
      })

router.put('/projects/:id', (req, res) => {

        if(!req.body){
          return res
          .status(400)
          .send({message: 'nothing to update'})
        }
    
        let title = req.body.title
        let description = req.body.description
        let id = req.params.id
    
       let project = new Project({
        title: title,
        description : description
       })
    
       Project.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send(data)
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })
    
       
    
        
      })

router.delete('/projects/:id', (req, res) => {
        Project.findByIdAndDelete(req.params.id)
        .then(data =>{
         if(!data){
           res.status(404).send({message:'nothing to delete'})
         } else{
           res.send({
             message:'project was deleted'
           })
         }
        })
        .catch(err=>{
         res.status(500).send({
           message:'could not delete the project'
         })
        })
       })

//TICKETS
router.get('/projects/:id/tickets', async (req, res) => {
  if(req.query.tag){
    const tag = req.query.tag
    Ticket.findOne({type:tag})
    .then(data =>{
      if(!data){
        res.status(404).send({message:'no project found'})
      } else{
        console.log(data)
        res.send(data)
      }
    })
    .catch(err=>{
      res.status(500).send({message:'failed '})
    })

  }
        let id = req.params.id
        console.log(await Ticket.countDocuments({ _id: id }))

        Ticket.find({projectId: id}).sort({created:-1})
        .populate('user', 'username')
        .then(ticket =>{
          res.send(ticket)
        })
        .catch(err =>{
          res.status(500).send({message:err.message || 'ERROR'})
        })
          
        
       
        
      })

router.post('/projects/:id/tickets', (req, res) => {
        if(!req.body.title){
          res.status(400).send({message:'what is the name of the ticket?'})
          return
        }
        let title = req.body.title
        let description = req.body.description
        let type = req.body.type
        let priority = req.body.priority
        let status = req.body.status
        let id = req.params.id
       let ticket = new Ticket({
        title: title,
        projectId:id,
        description : description,
        type:type,
        priority:priority,
        status:status,
        assignTo:assignTo
       })
    
       ticket
       .save(ticket)
       .then(data=>{
        res.send(data)
       })
       
       .catch(err=>{
        res.status(500).send({
          message:err.message|| 'some error occurred, try again'
        })
       })
       
      
       
    
    
        
      })

router.put('/projects/:projectId/tickets/:id', (req, res) => {
    
        if(!req.body){
          return res
          .status(400)
          .send({message: 'nothing to update'})
        }
        let projectId = req.params.projectId
        let title = req.body.title
        let description = req.body.description
        let type = req.body.type
        let priority = req.body.priority
        let status = req.body.status
        let id = req.params.id
        let assignTo = req.body.assignTo
    
       let ticket = new Ticket({
        title: title,
        description : description,
        projectId:projectId,
        type:type,
        priority:priority,
        status:status,
        assignTo:assignTo
       })
    
       Ticket.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
       .then(data =>{
        if(!data){
          res.status(404).send({message: 'cannot update'})
        } else{
          res.send(data)
        }
       })
       .catch(err =>{
        res.status(500).send({message:'error update user info'})
       })
        
       
    
        
      })

router.delete('/projects/:projectId/tickets/:id', (req, res) => {
        let ticketId = req.params.id
        let projectId = req.params.projectId
        Ticket.findByIdAndDelete(ticketId)
        .then(data =>{
         if(!data){
           res.status(404).send({message:'nothing to delete'})
         } else{
           res.send({
             message:'ticket was deleted'
           })
         }
        })
        .catch(err=>{
         res.status(500).send({
           message:'could not delete the project'
         })
        })
       })


//NOTES

router.get('/users', (req, res)=>{
  User.find({})
        .then(users =>{
          res.send(users)
        })
        .catch(err =>{
          res.status(500).send({message:err.message || 'ERROR'})
        })
})

router.post('/register', async (req, res) =>{
    //VALIDATION
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
   
   //check if email exists

   const emailExists = await User.findOne({email:req.body.email})
   const usernameExists = await User.findOne({username:req.body.username})
   if(emailExists) return res.status(400).send('Email already exists!')
   if(usernameExists) return res.status(400).send('Create a unique username')


   //HASH THE PW

   const salt = await bcrypt.genSalt(10)
   const hashPassword = await bcrypt.hash(req.body.password, salt)
    //CREATE USER
    
    let user = new User({
        name:req.body.name,
        username:req.body.username, 
        email:req.body.email,
        password:hashPassword
    })
    //SAVE USER
    try{
        const savedUser = await user.save()
        res.send({user: user._id})
    } catch(err){
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) =>{
//VALIDATION
const {error} = loginValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)

const user = await User.findOne({email:req.body.email})
if(!user) return res.status(400).send('email does not exist')

const validPass = await bcrypt.compare(req.body.password, user.password)
if(!validPass) return res.status(400).send('invalid password')

res.send('success')
 
} )
    module.exports = router;