const { logger } = require('firebase-functions')

const httpService = require('../../services/http.service')

// Initialize Firebase

const sendSms = async (req, res) => {
  const fromPhone = '+12694480488'
  logger.log(req.body)
  logger.log(req.headers)

  const { To, Body } = req.body

  try {
    const params = new URLSearchParams()
    params.append('From', fromPhone)
    params.append('Body', Body)
    params.append('To', To)

    const response = await httpService.post({
      url: `https://api.twilio.com/2010-04-01/Accounts/AC268e608134d192748efae6391170a9d4/Messages.json`,
      postData: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic QUMyNjhlNjA4MTM0ZDE5Mjc0OGVmYWU2MzkxMTcwYTlkNDo1NTc5NDdjZjEwMzQxN2FiMTE1ZTAwMDE3NjM0NGRkMQ==`
      }
    })

    res.status(200).send(response)
  } catch (error) {
    logger.error(error)
    res.status(400).json(error)
  }
}
const sendTestSms = async (req, res) => {
  logger.log(req.body)
  logger.log(req.headers)

  const { message, phone_number } = req.body

  try {
    const postData = {
      message: message,
      tpoa: 'Vroomit',
      recipient: [
          {
              msisdn: phone_number
          }
      ]
  }

    const response = await httpService.post({
      url: `https://api.labsmobile.com/json/send`,
      postData: params,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic c29wb3J0ZUB2cm9vbWl0LmlvOk5PWGFXZEYxOXNRcm9GNTN5czd3ZmhJcTJMTTkwc2xO`
      }
    })

    res.status(200).send(response)
  } catch (error) {
    logger.error(error)
    res.status(400).json(error)
  }
}

module.exports = {
  sendSms,
  sendTestSms
}
