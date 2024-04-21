const { logger } = require('firebase-functions')
const httpService = require('../../services/http.service')

// Initialize Firebase

const sendEmail = async (req, res) => {
  logger.log(req.body)
  logger.log(req.headers)

  const { To, TemplateId, Subject, Variables } = req.body
  try {
    const postData = {
      Messages: [
        {
          From: {
            Email: 'no-responder@vroomit.io',
            Name: 'Vroomit'
          },
          To: [
            {
              Email: To
            }
          ],
          TemplateID: TemplateId,
          TemplateLanguage: true,
          Subject,
          Variables
        }
      ]
    }

    const response = await httpService.post({
      url: `https://api.mailjet.com/v3.1/send`,
      postData: postData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic YTNhZjNhYzVmY2YzNjQ3ODIwZTMxYzI1N2U5N2M2MjA6ZjZlNDZmY2JkZmI5OWFlNzdlN2NhOTZiZjFmZTNkODY=`
      }
    })

    res.status(200).send(response.data)
  } catch (error) {
    logger.error(error)
    res.status(400).send('Error al enviar el correo')
  }
}

module.exports = {
  sendEmail
}
