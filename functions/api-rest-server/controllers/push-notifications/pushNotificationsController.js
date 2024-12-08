const { sendPushNotification } = require('../../../libs/push-notifications/pushNotifications')

async function sendPushNotificationHandler(req, res) {
  const { message, code } = await sendPushNotification(req.body)
  res.status(code).send({ code, message })
}

module.exports = {
  sendPushNotificationHandler
}
