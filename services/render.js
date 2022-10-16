const {Project, Ticket, Userdata} = require('../models/project')

exports.projects = (req, res) =>{
  let userId = req.user._id
  let title = ''
  let description = ''
  Project.find({user:userId}).populate({path:'user', select: 'username'}).sort({ sorting: 1 })
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

  function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
  }


  let title = req.body.title
  let description = req.body.description
  let user =req.user._id
  let progress = 0
  var randomColor = getRandomColor()

  Project.countDocuments({user:user}, function( err, count){
    let project = new Project({
      title: title,
      description : description,
      user:user,
      progress:progress,
      color: randomColor,
      sorting: count - 1
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
})

}
exports.reorder_project = (req, res) =>{
let ids = req.body['id']
ids.forEach((id, index)=>{

  (function(index) {
Project.findById(id, function(err, project) {
  project.sorting = index
  project.save(function(err) {
    if(err) return console.log(err)
  })
})
  })(index)
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
    let progress = req.body.progress
    const projectId = req.params.projectId
    let project = new Project({
      title: title,
      description : description,
      progress:progress
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
    Project.find({user:userId})
    .exec(function (err, projects) {
    Project.find({_id:id}).populate('tickets')
    .then(data =>{
      res.render('pages/tasks', {
        projects:projects,
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
  Project.find({user:userId}).populate('tickets') 
    .exec(function (err, projects) {
    Ticket.find({_id:ticketId}).populate('projectId').exec(function (err, ticket) {
      if(err) console.log(err)
        res.render('pages/workspace', {
            projects : projects,
            ticket : ticket,
            ticketId:ticketId,
            userId:userId,
            id:id
        });
    });
});
}
 
    
  


   
