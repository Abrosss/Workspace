
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
        console.log(data)
        // send out to a REST API
        fetch(`https://workspace-bugtracker-api.herokuapp.com/projects/${projectId}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(window.location.reload())
          .catch(error => console.log(error));
      });
    })


   
   
      }
    )();
// edit ticket
    (function () {
      const form = document.querySelectorAll('.edit-ticket')
      form.forEach(form=>{
        const ticketId = form.dataset.ticketid
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          const formData = new FormData(this);
          const entries = formData.entries();
          const data = Object.fromEntries(entries);
          console.log(data)
          // send out to a REST API
          fetch(`https://workspace-bugtracker-api.herokuapp.com/tickets/${ticketId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(window.location.reload())
            .catch(error => console.log(error));
        });
      })
 
 
     
     
        }
      )();


});