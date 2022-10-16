const express = require('express')
const router = express.Router()
const services = require('../services/render.js')
const auth = require('../config/auth')
const isUser = auth.isUser


router.get('/', isUser, services.projects)
router.post('/reorder-project', services.reorder_project)

router.post('/add-project', services.add_project)

router.put('/:projectId', services.edit_project)

router.get('/delete-project/:id', services.delete_project)

router.get('/:id', isUser, services.tickets)

router.post('/:id/add-ticket', services.add_ticket)

router.post('/:id/add-ticket', services.add_ticket)



router.get('/:projectId/delete-ticket/:id', services.delete_ticket)

router.get('/:id/:ticketId', isUser, services.workspace)

module.exports = router