const { Router } = require('express')
const pushNotificationsCtrl = require('../controllers/push-notifications/pushNotificationsController')
const pushRouter = Router()

pushRouter.route('/send').post(pushNotificationsCtrl.sendPushNotificationHandler)

module.exports = pushRouter
