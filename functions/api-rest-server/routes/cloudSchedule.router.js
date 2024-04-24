const express = require('express')
const cloudScheduleCtrl = require('../controllers/cloud-schedule/cloudScheduleController')
const cloudScheduleRouter = express.Router()

cloudScheduleRouter.route('/test-cloudf-schedule').post(cloudScheduleCtrl.enviarEmails)
module.exports = cloudScheduleRouter
