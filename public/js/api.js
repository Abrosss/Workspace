
//https://www.valentinog.com/blog/form-data/


document.addEventListener('DOMContentLoaded', function () {
    
  // edit project PUT
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
        req.open('PUT', `/projects/${projectId}`)
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
// edit ticket PUT
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
          console.log(data)
          // send out to a REST API
          const req = new XMLHttpRequest()
          req.open('PUT', `/api/${ticketId}`)
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

      (function () {
        
        const form = document.querySelectorAll('.task-input form')
        const container = document.querySelector('.notes-container ul')
        form.forEach(form=>{
           const ticketId = form.dataset.ticketid
           const parent = form.parentNode
           const ul = parent.nextElementSibling
          form.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const formData = new FormData(this);
            const entries = formData.entries();
            const data = Object.fromEntries(entries);
            let note = data.note
            let id = Date.now()
            let newNote = {"id":id, 'content':note}
          
            // send out to a REST API
            const req = new XMLHttpRequest()
            req.open('POST', `/api/${ticketId}/addTask`)
            req.setRequestHeader('Content-Type', 'application/json')
            req.addEventListener('load', function() {
              if(req.status === 200 && req.readyState === 4) {
                form.reset()
               const li = document.createElement('li')
               li.classList.add('note-item')
               li.innerHTML=` <div class="flex"><div class="round"><input type="checkbox" id="${id}" /><label for="${id}"></label></div>  <p>${note}</p><form class="edit-note hidden">
               <input></input>
             </form></div><span data-ticketid="${ticketId}" data-noteid="${id}" class="icon trash delete-note"></span>`
              ul.appendChild(li)
             
              } else {
                throw new Error ('Bad request')
              }
            })
            req.send(JSON.stringify(newNote))
            
          });
        })
   
   
       
       
          }
        )();
});


