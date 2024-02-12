const mainRouter = require('express').Router()
const authRouter = require('./auth.router')
const manualTriggersRouter = require('./manualTriggers.router')
const openAIRouter = require('./openAI.router')

mainRouter.use('/auth', authRouter)
mainRouter.use('/manual-trigger', manualTriggersRouter)
mainRouter.use('/open-ai', openAIRouter)

module.exports = app => {
  app.use('/', mainRouter)
  app.get('/echotest', (req, res) => {
    console.log('ECHOTEST!')
    res.send('HandymanApp API funcionando!')
  })
}
