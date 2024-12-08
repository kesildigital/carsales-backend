const { logger } = require('firebase-functions')

const { SmsProviders, sendSms: sendSmsService } = require('../../../libs/sms/sms')
const { createDocument, get } = require('../../../libs/firebase-api-helpers')

const sendSms = async (req, res) => {
  logger.log(req.body)
  logger.log(req.headers)

  const { To, Body } = req.body

  try {
    const lastFiveSms = await get({
      collection: 'sms_test',
      limit: 5,
      orderBy: { field: 'date', direction: 'desc' }
    })
    const lastMsg = lastFiveSms[0]?.data() ?? {}
    const lastFiveSmsAreWau = lastFiveSms.every(sms => sms.data().provider === SmsProviders.WAU_SMS)
    const lastFiveSmsAreMesaje = lastFiveSms.every(sms => sms.data().provider === SmsProviders.MENSAJE_SMS)

    let provider = lastMsg.provider ?? SmsProviders.MENSAJE_SMS

    if (lastMsg.provider === SmsProviders.WAU_SMS && lastFiveSmsAreWau) {
      provider = SmsProviders.MENSAJE_SMS
    }

    if (lastMsg.provider === SmsProviders.MENSAJE_SMS && lastFiveSmsAreMesaje) {
      provider = SmsProviders.WAU_SMS
    }

    const response = await sendSmsService({ phone: To, message: Body, provider })
    const wasSuccessful = false

    await createDocument({
      collection: 'sms_test',
      doc: {
        provider,
        result: wasSuccessful ? 'success' : 'error',
        error_message: wasSuccessful ? '' : response?.message,
        phone: To,
        message: Body,
        date: new Date()
      }
    })

    res.status(response.code).send({ message: response.message })
  } catch (error) {
    logger.error(error)
    res.status(400).json(error)
  }
}

module.exports = {
  sendSms
}
