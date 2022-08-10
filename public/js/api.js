
//https://www.valentinog.com/blog/form-data/


document.addEventListener('DOMContentLoaded', function () {
    
  // edit project
  (function () {
    const form = document.querySelectorAll('.edit-form')
    form.forEach(form=>{
      const projectId = form.dataset.projectid
      form.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const entries = formData.entries();
        const data = Object.fromEntries(entries);
     
        const req = new XMLHttpRequest()
        req.open('PUT', `http://localhost:5000/projects/${projectId}`)
        req.setRequestHeader('Content-Type', 'application/json')
        req.addEventListener('load', function() {
          if(req.status === 200 && req.readyState === 4) {
            location.reload()
          } else {
            throw new Error ('Bad request')
          }
        })
        req.send(JSON.stringify(data))
      });
    })


   
   
      }
    )();
// edit ticket
    (function () {
      const form = document.querySelectorAll('.edit-ticket')
      form.forEach(form=>{
        const projectId = form.dataset.projectId
        const ticketId = form.dataset.ticketid
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          const formData = new FormData(this);
          const entries = formData.entries();
          const data = Object.fromEntries(entries);
          // send out to a REST API
          const req = new XMLHttpRequest()
          req.open('PUT', `http://localhost:5000/projects/${projectId}/edit-ticket/${ticketId}`)
          req.setRequestHeader('Content-Type', 'application/json')
          req.addEventListener('load', function() {
            if(req.status === 200 && req.readyState === 4) {
             
              location.reload()
            } else {
              throw new Error ('Bad request')
            }
          })
          req.send(JSON.stringify(data))
          
        });
      })
 
 
     
     
        }
      )();


});


