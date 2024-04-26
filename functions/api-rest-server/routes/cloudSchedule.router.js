const express = require('express')
const cloudScheduleCtrl = require('../controllers/cloud-schedule')
const cloudScheduleRouter = express.Router()

cloudScheduleRouter.route('/test-cloud-schedule').get(cloudScheduleCtrl.enviarEmails)
module.exports = cloudScheduleRouter
