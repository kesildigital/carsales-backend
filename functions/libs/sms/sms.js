const { logger } = require('firebase-functions')
const { getOne } = require('../firebase-api-helpers')
const { HTTP_CODES } = require('../httpCodes')
const axios = require('axios')

const SmsProviders = {
  WAU_SMS: 'WAU_SMS',
  MENSAJE_SMS: 'MENSAJE_SMS'
}

function cleanPhone(phone) {
  phone = phone.replace('580412', '58412')
  phone = phone.replace('580414', '58414')
  phone = phone.replace('580424', '58424')
  phone = phone.replace('580416', '58416')
  phone = phone.replace('580426', '58426')
  return phone
}

async function sendWauSms({ to, text }) {
  await axios.post(
    `https://dashboard.wausms.com/Api/rest/message`,
    {
      to: [cleanPhone(to)],
      text,
      from: 'Vroomit',
      coding: 'utf-16'
    },
    {
      headers: {
        Authorization: `Basic a2VzaWxkaWdpdGFsZ21hOkNCcm41OCYn`
      }
    }
  )
}

async function sendMensajeSms({ to, text }) {
  try {
    await axios.post('https://smsv3.mensajesms.com.ve/api/v1/sendsms', {
      token: 'BQC4-QJ4K-BVNz-JrY2',
      user: 'kjcc.online@gmail.com',
      celular: cleanPhone(to),
      mensaje: text
    })

    return true
  } catch (error) {
    return false
  }
}

async function sendSms(data) {
  // Extrae los datos del cuerpo de la solicitud
  const { phone, message, provider } = data

  // Verifica que los datos requeridos estén presentes
  if (!phone || !message) {
    return { code: HTTP_CODES.BAD_REQUEST, message: 'Missing phone or message' }
  }

  try {
    const payload = { to: phone, text: message }
    if (provider === SmsProviders.WAU_SMS) {
      const sent = await sendWauSms(payload)

      if (!sent) {
        await sendMensajeSms(payload)
      }
    } else {
      const sent = await sendMensajeSms(payload)

      if (!sent) {
        await sendWauSms(payload)
      }
    }
    logger.info('Successfully sent message')
    return { code: HTTP_CODES.OK, message: 'SMS sent successfully' }
  } catch (error) {
    logger.error('Error sending message:', error)
    return { code: HTTP_CODES.INTERNAL_SERVER_ERROR, message: error?.message }
  }
}

module.exports = { sendSms, SmsProviders }
