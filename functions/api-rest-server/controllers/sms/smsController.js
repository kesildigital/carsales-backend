const { logger } = require('firebase-functions')

const httpService = require('../../services/http.service')

// Initialize Firebase

const sendSms = async (req, res) => {
  const accountId = 'AC268e608134d192748efae6391170a9d4'
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
      url: `https://api.twilio.com/2010-04-01/Accounts/${accountId}/Messages.json`,
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

module.exports = {
  sendSms
}
