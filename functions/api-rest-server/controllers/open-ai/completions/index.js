const openAIRequestsHandler = require('../services/openAIRequestsHandler')
const config = require('../../../../config')
const { logger } = require('firebase-functions')
const { makeRequestWithRetries } = require('../services/helpers')

const createChatCompletion = async (req, res) => {
  logger.log(req.body)
  try {
    const { messages, modelAI } = req.body
    const url = `${config.openAI.baseUrl}/chat/completions`
    const postData = {
      model: modelAI,
      messages,
      temperature: 0.1
    }

    const request = async () => await openAIRequestsHandler.post({ url, postData })
    const response = await makeRequestWithRetries(request)

    const { status, data } = response
    if (status !== 200) {
      logger.log({ error: data })
      return res.status(500).send({ error: data })
    }

    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
}

const createCompletion = async (req, res) => {
  logger.log(req.body)
  try {
    const { prompt } = req.body
    const url = `${config.openAI.baseUrl}/completions`
    const postData = {
      model: 'gpt-3.5-turbo-instruct',
      prompt,
      temperature: 0
    }

    const request = async () => await openAIRequestsHandler.post({ url, postData })
    const response = await makeRequestWithRetries(request)

    const { status, data } = response
    if (status !== 200) {
      logger.log({ error: data })
      return res.status(500).send({ error: data })
    }

    res.status(200).send(data)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error })
  }
}

module.exports = { createChatCompletion, createCompletion }
