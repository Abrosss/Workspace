"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  /* function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
  callback(webP.height == 2);
  };
  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }
  testWebP(function (support) {
  if (support == true) {
  document.querySelector('body').classList.add('webp');
  }else{
  document.querySelector('body').classList.add('no-webp');
  }
  });*/

  feather.replace();



// sidebar toggle

  (function () {
    var sidebar = document.querySelector('.sidebar'),
        catSubMenu = document.querySelector('.cat-sub-menu'),
        sidebarBtns = document.querySelectorAll('.sidebar-toggle');

    var _iterator = _createForOfIteratorHelper(sidebarBtns),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var sidebarBtn = _step.value;

        if (sidebarBtn && sidebarBtn) {
          sidebarBtn.addEventListener('click', function () {
            var _iterator2 = _createForOfIteratorHelper(sidebarBtns),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var sdbrBtn = _step2.value;
                sdbrBtn.classList.toggle('rotated');
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            sidebar.classList.toggle('hidden');
        
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  })();

// dropdown

  (function () {
    var userDdBtnList = document.querySelectorAll('.dropdown-btn');
    var userDdList = document.querySelectorAll('.tasks-item-dropdown');
    var layer = document.querySelector('.layer');

    if (userDdList && userDdBtnList) {
      var _iterator3 = _createForOfIteratorHelper(userDdBtnList),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var userDdBtn = _step3.value;
          userDdBtn.addEventListener('click', function (e) {
            layer.classList.add('active');

            var _iterator4 = _createForOfIteratorHelper(userDdList),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var userDd = _step4.value;

                if (e.currentTarget.nextElementSibling == userDd) {
                  if (userDd.classList.contains('active')) {
                    userDd.classList.remove('active');
                  } else {
                    userDd.classList.add('active');
                  }
                } else {
                  userDd.classList.remove('active');
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    if (layer) {
      layer.addEventListener('click', function (e) {
        var _iterator5 = _createForOfIteratorHelper(userDdList),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var userDd = _step5.value;

            if (userDd.classList.contains('active')) {
              userDd.classList.remove('active');
              layer.classList.remove('active');
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      });
    }
  })();

// darkmode
  (function () {
    var darkMode = localStorage.getItem('darkMode');
    var darkModeToggle = document.querySelector('.theme-switcher');

    var enableDarkMode = function enableDarkMode() {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkMode', 'enabled');
    };

    var disableDarkMode = function disableDarkMode() {
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkMode', null);
    };

    if (darkMode === 'enabled') {
      enableDarkMode();
    }

    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function () {
        darkMode = localStorage.getItem('darkMode');

        if (darkMode !== 'enabled') {
          enableDarkMode();
        } else {
          disableDarkMode();
        }

        addData();
      });
    }
  })();

//focus on input after opening the modal

  (function(){
  const addButtons = document.querySelectorAll('.add-btn')
  addButtons.forEach(button=>button.addEventListener('click', focusInput))
  const form = document.querySelector('.addForm')
  const editform = document.querySelectorAll('.editForm')
  function focusInput(e){
    console.log(form.querySelector('input'))
    if(e.currentTarget.dataset.button=='add')
    setTimeout(() => {

        form.querySelector('input').focus()
      }, "500")
   else{
    setTimeout(() => {
      editform.forEach(input=>{
        input.querySelector('input').focus()
                //putting the cursor in the end of the word in input
        var val = input.querySelector('input').value;
        input.querySelector('input').value = ''
        input.querySelector('input').value = val;
      })
      }, "500")
   }
}
  })();

  (function() {
    if( document.querySelector('.note-input')) {
      const inputs = document.querySelectorAll('.note-input')
      inputs.forEach(input => {
        input.addEventListener('click', showMore)
     
      } )

      function showMore(e) {
        if(e.target.classList.contains('form-control'))
        document.querySelector('.input-info').classList.remove('hidden')
  
       
      }
    //   function hideMore(e) {
        
    //     e.stopPropagation()
      
    //     if (e.target.classList.contains('task-type') || e.target.classList.contains('form-control') || e.target.classList.contains('form-group') || e.target.classList.contains('bug') || e.target.classList.contains('improvement') || e.target.classList.contains('btn')){
    //       document.querySelector('.input-info').classList.remove('hidden')
    //     }
    //     else {
        
    //       document.querySelector('.input-info').classList.add('hidden')
    //     }
    // }
   
    }
   
  })();

//close bookmarks on the dashboard and workspace pages

(function(){
  const page = document.querySelector('.page-flex')
  if(page.classList.contains('workspace-page') || page.classList.contains('dashboard-page')) {
  const closeButtons = document.querySelectorAll('.close')
  const bookmarks = document.querySelector('#bookmarks')
  const bookmarksIcon = document.querySelector('#bookmarks-hidden')
  closeButtons.forEach(button => button.addEventListener('click', close))
  bookmarksIcon.addEventListener('click', open)
  function close() {
    bookmarks.classList.toggle('hidden')
    bookmarksIcon.classList.toggle('true')
  }
  function open() {
    bookmarks.classList.toggle('hidden')
    bookmarksIcon.classList.toggle('true')
  }
}
  })();

//sidebar iteration through projects and tasks on the workspace page

(function(){
  const page = document.querySelector('.page-flex')
  if(page.classList.contains('workspace-page')) {
  const sidebarProjects = document.querySelectorAll('.project-item')
  const backArrow = document.querySelector('.back-icon')
  backArrow.addEventListener('click', showProjects)
  sidebarProjects.forEach(project => project.addEventListener('click', showTasks) )
  
  function showProjects() {
    document.querySelector('.sub-projects').style.left='0'
    document.querySelector('.sub-projects').classList.toggle('hidden')
    document.querySelector('.sub-tasks').style.left='1000px'
    document.querySelector('.sub-tasks').classList.toggle('show')
    document.querySelector('.sublist-sidebar-tickets').innerHTML=''
  }

  function showTasks(e) {
        const projectId = e.target.dataset.id
        const projectName = e.target.dataset.name
        document.querySelector('.active-project').innerText =`${projectName}`
        document.querySelector('.sub-tasks').style.left='0'
        document.querySelector('.sub-tasks').classList.toggle('show')
        document.querySelector('.sub-projects').style.left='-1000px'
        document.querySelector('.sub-projects').classList.toggle('hidden')

        //add tasks, if no tasks, display 'no tasks' 
        const req = new XMLHttpRequest()
        req.open('GET', `http://localhost:5000/api/tasks/${projectId}`, true)
        req.onload = function() {
          if(req.status==200) {
            let tasks = JSON.parse(this.response)
            if(tasks.length !== 0) {
            tasks.forEach(task => {
             
              const li = document.createElement('li')
              const a = document.createElement('a')
              li.classList.add('sidebar-subitem')
              li.classList.add('task-item')
              a.innerText=task.title
              a.href = `/projects/${projectId}/${task._id}`
              li.appendChild(a)
              document.querySelector('.sublist-sidebar-tickets').appendChild(li)
              })
    
            }
            else {
            const p = document.createElement('p')
            p.classList.add('italic')
            p.style.opacity='.7'
            p.innerText = 'no tasks'
            document.querySelector('.sublist-sidebar-tickets').appendChild(p)
            }
          }
            else console.log('lol')
         
      
        
          }
          req.send()
        }
  }
})() ;


//get the updated data from database and insert it in the progress bar on the project page
// (function(){
//   const page = document.querySelector('.page-flex')
//   if(page.classList.contains('tasks-page')){
//   const url = window.location.href;
//   const urlSplit = url.split('/');
//   const projectId = urlSplit[urlSplit.length-1]
//   console.log(projectId)
//     const req = new XMLHttpRequest()

//     req.open('GET', `http://localhost:5000/api/projects/${projectId}`, true)
//     req.onload = function() {
//       if(req.status==200) {
        
//         let project = JSON.parse(this.response)
//   console.log(project.progress)
//         let progress =  document.querySelector('.progress-filled')
//         progress.style.flexBasis =`${project.progress}%`
//         document.querySelector('.percentage').innerHTML=`${project.progress} %`

//         //the math is here to update info, after adding/deleting a new task, probably needs to be optimized

//         const finish = 100
//         let tickets = project.tickets
//         let total = 0
//         let completed = 0
//         for (let i = 0; i<tickets.length;i++) {
//           total++
//           if(tickets[i].completed)
//           completed++
//         }
//         let oneTaskPercentage = finish/total
//         let completedPercentage = Math.round(oneTaskPercentage * completed) || 0
//         let left = finish - completedPercentage
//         let progressBar =  document.querySelector('.progress-filled')
    
   
        
//         document.querySelector('.percentage').innerHTML=`${completedPercentage} %`
//       //  progressBar.style.flexBasis =`${completedPercentage}%`
        
//         }
//         else console.log('failed')
     
  
    
//       }
//       req.send()
//     }
// })();


//mark completed function in tasks

// (function(){
//   const buttons = document.querySelectorAll('.completed');
//   buttons.forEach(button => button.addEventListener('click', markCompleted));
//   //https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/#:~:text=Making%20a%20fetch%20POST%20or%20PUT%20request,-To%20make%20a&text=This%20is%20done%20by%20adding,we%20specify%20the%20content%20type.

//   //press the 'mark completed button', send 'completed:true' to database

// function markCompleted(e) {
//   const ticketId = e.target.dataset.ticketid;
//   const req = new XMLHttpRequest()
//   req.open('PUT', `http://localhost:5000/api/tasks/${ticketId}`)
//   req.setRequestHeader('Content-Type', 'application/json')
//   req.onload = function() {
//     if(req.status !== 200) {
//       throw new Error('failed')
//     }
//     }
//     req.send(JSON.stringify({completed:true}))
//     updateprogress()
//   }

//   //iterate through tasks, count completed tasks, find the progress percentage, display info 
// function updateprogress() {
//     const url = window.location.href;
//     const urlSplit = url.split('/');
//     const projectId = urlSplit[urlSplit.length-1]

//     const req = new XMLHttpRequest()
//     req.open('GET', `http://localhost:5000/api/projects/${projectId}`, true)
//     req.onload = function() {
//       if(req.status==200) {
//         let project = JSON.parse(this.response)
//         const finish = 100
//         let total = 0
//         let completed = 0
//         let tickets = project.tickets
//         for (let i = 0; i<tickets.length;i++) {
//           total++
//             if(tickets[i].completed)
//             completed++
//         }
//         let oneTaskPercentage = finish/total
//         let completedPercentage = Math.round(oneTaskPercentage * completed)
//         let left = finish - completedPercentage
//         let progress =  document.querySelector('.progress-filled')
//         document.querySelector('.percentage').innerHTML=`${completedPercentage} %`
//         // progress.style.flexBasis =`${completedPercentage}%`

//         updateproject(completedPercentage)

//         }
//         else console.log('failed')
//       }
//       req.send()
//   }
//   //update project in the database with a 'progress percentage' so after refreshing the page, the progress bar stays updated
// function updateproject(progress) {
//   console.log(progress)
//     const url = window.location.href;
//     const urlSplit = url.split('/');
//     const projectId = urlSplit[urlSplit.length-1]
//     const req = new XMLHttpRequest()
//     req.open('PUT', `http://localhost:5000/api/projects/${projectId}`)
//     req.setRequestHeader('Content-Type', 'application/json')
//     req.onload = function() {
//       console.log(req.status)
//       if(req.status === 200) {
//         console.log('okok')
//         req.send(JSON.stringify({progress:progress}))
//       }
      
//       if(req.status !== 200) {
//         throw new Error('failed')
//       }
//     }
      
//   }

// })()
})