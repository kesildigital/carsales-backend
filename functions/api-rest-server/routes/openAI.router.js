const express = require('express')
const openAIController = require('../controllers/open-ai')
const openAIRouter = express.Router()

openAIRouter.route('/chat/completions').post(openAIController.createChatCompletion)
openAIRouter.route('/completions').post(openAIController.createCompletion)

module.exports = openAIRouter
