const express = require('express')
const mailjetCtrl = require('../controllers/mailjet/mailjetController')
const mailjetRouter = express.Router()

mailjetRouter.route('/send').post(mailjetCtrl.sendEmail)
module.exports = mailjetRouter
