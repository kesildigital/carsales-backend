const { logger } = require('firebase-functions')

const httpService = require('../../services/http.service')

// Initialize Firebase

function cleanPhone(phone) {
  phone = phone.replace('580412', '58412')
  phone = phone.replace('580414', '58414')
  phone = phone.replace('580424', '58424')
  phone = phone.replace('580416', '58416')
  phone = phone.replace('580426', '58426')
  return phone
}

const sendSms = async (req, res) => {
  logger.log(req.body)
  logger.log(req.headers)

  const { To, Body } = req.body

  try {
    const response = await httpService.post({
      url: `https://dashboard.wausms.com/Api/rest/message`,
      postData: {
        to: [cleanPhone(To)],
        text: Body,
        from: 'Vroomit',
        coding: 'utf-16'
      },
      headers: {
        Authorization: `Basic a2VzaWxkaWdpdGFsZ21hOkNCcm41OCYn`
      }
    })

    res.status(200).send(response.data)
  } catch (error) {
    logger.error(error)
    res.status(400).json(error)
  }
}

module.exports = {
  sendSms
}
