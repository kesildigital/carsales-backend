const { logger } = require('firebase-functions')
const { messaging: FCMessaging } = require('firebase-admin')
const { getOne } = require('../firebase-api-helpers')
const { HTTP_CODES } = require('../httpCodes')

async function sendPushNotification(data) {
  // Extrae los datos del cuerpo de la solicitud
  const { title, body, userId, payload = {}, screen } = data

  // Verifica que los datos requeridos estén presentes
  if (!userId || !title || !body) {
    return { code: HTTP_CODES.BAD_REQUEST, message: 'Missing title, body, or userId' }
  }

  const userDoc = await getOne({
    collection: 'users',
    filters: [{ field: 'uid', operator: '==', value: userId }]
  })

  if (!userDoc.exists) {
    logger.error(`User with id = ${userId} does not exist`)
    return { code: HTTP_CODES.BAD_REQUEST, error: 'User does not exist' }
  }

  if (!userDoc.data().fcm_token) {
    logger.error(`User with id = ${userId} does not have push notifications configured`)
    return { code: HTTP_CODES.BAD_REQUEST, error: 'User does not have push notifications configured' }
  }

  // Crea el mensaje de notificación
  const message = {
    notification: {
      title,
      body
    },
    token: userDoc.data().fcm_token,
    data: {
      screen,
      payload: JSON.stringify(payload)
    }
  }

  // Envía la notificación a FCM
  try {
    const response = await FCMessaging().send(message)
    logger.info('Successfully sent message:', response)
    return { code: HTTP_CODES.OK, message: 'Notification sent successfully' }
  } catch (error) {
    logger.error('Error sending message:', error)
    return { code: HTTP_CODES.INTERNAL_SERVER_ERROR, message: error?.message }
  }
}

module.exports = { sendPushNotification }
