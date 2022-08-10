const {Project, Ticket, Userdata} = require('../models/project')

exports.projects = (req, res) =>{
  let userId = req.user._id
  let title = ''
  let description = ''
  Project.find({user:userId}).populate({path:'user', select: 'username'})
  .then(data =>{
    res.render('pages/projects', {
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
    user:user
   })
   project.save(err =>{
    if(err) console.log(err)
    
   })
   //add project ID to user data
   Userdata.findOne({user:user}, (err, data)=>{
    if(err) return console.log(err)
    
    data.projects.push(project._id)
    data.save(err =>{
      if(err) console.log(err)
      res.redirect('/projects')
     })
   })
}

exports.edit_project = (req, res) => {

  if(!req.body){
    return res
    .status(400)
    .send({message: 'nothing to update'})
  }
    let title = req.body.title
    let description = req.body.description
    const projectId = req.params.projectId
    let project = new Project({
      title: title,
      description : description
     })
     Project.findByIdAndUpdate(projectId, req.body,{useFindAndModify:false})
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

}
exports.delete_project = (req, res) => {
  let userId = req.user._id
  let projectId = req.params.id
  Project.findByIdAndDelete(projectId, err =>{
    if(err) console.log(err)
    Ticket.deleteMany({projectId:projectId})
    .then(data =>{
      res.redirect('/projects')}
     )
     .catch(err=>{
      console.log(err)
     })

   })
   Userdata.updateOne({ user: userId }, { "$pull": { "projects": { $eq: projectId } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)
   
});

  
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
      res.render('pages/tasks', {
        project: data,
        userId: userId,
        title: title,
      description: description,
      type: type,
      priority: priority,
      status: status,
      id: id
      })
      }
    )
    .catch(err=>{
      console.log(err)
    })   
}

exports.add_ticket = (req, res) => {
  let username = req.user.username
  let title = req.body.title
  let description = req.body.description
  let type = req.body.type
  let priority = req.body.priority
  let status = 'open'
  let projectId = req.params.id
  let user = req.user._id
  let ticket = new Ticket({
    title: title,
    projectId:projectId,
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
   Project.findOne({_id:projectId}, (err, data)=>{
    if(err) return console.log(err)
    data.tickets.push(ticket)
    data.save(err =>{
      if(err) console.log(err)
      res.redirect(`/projects/${projectId}`)
     })
   })

}
exports.edit_ticket = (req, res) => {
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

}
exports.delete_ticket = (req, res) => {
  let ticketId = req.params.id
  let projectId = req.params.projectId
 
  Ticket.findByIdAndDelete(ticketId, err =>{
    if(err) return console.log(err)
   })
   Project.updateOne({ _id: projectId }, { "$pull": { "tickets": { $eq: ticketId } }}, { safe: true, multi:true }, function(err, obj) {
    if(err) return console.log(err)
    res.redirect(`/projects/${projectId}`)}

)}
    
exports.workspace = (req, res) =>{
  let id = req.params.id
  let ticketId = req.params.ticketId
  let userId = req.user._id
  Ticket.find({_id:ticketId}).populate('projectId')
    .then(data =>{
      console.log(data)
      res.render('pages/workspace', {
        ticket: data,
        userId:userId,
        id:id
     
      })
    })
    .catch(err=>{
      console.log(err)
    })
  


   
}
