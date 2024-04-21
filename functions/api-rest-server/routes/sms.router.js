const express = require('express')
const smsCtrl = require('../controllers/sms/smsController')
const smsRouter = express.Router()

smsRouter.route('/send').post(smsCtrl.sendSms)
smsRouter.route('/sendTest').post(smsCtrl.sendTestSms)
module.exports = smsRouter
