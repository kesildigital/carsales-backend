const mainRouter = require('express').Router()
const authRouter = require('./auth.router')
const manualTriggersRouter = require('./manualTriggers.router')
const openAIRouter = require('./openAI.router')
const smsRouter = require('./sms.router')
const mailjetRouter = require('./mailjet.router')
const exchangeRateRouter = require('./exchangeRate.router')
const cloudScheduleRouter = require('./cloudSchedule.router')

mainRouter.use('/auth', authRouter)
mainRouter.use('/manual-trigger', manualTriggersRouter)
mainRouter.use('/open-ai', openAIRouter)
mainRouter.use('/sms', smsRouter)
mainRouter.use('/mailjet', mailjetRouter)
mainRouter.use('/exchangeRate', exchangeRateRouter)
mainRouter.use('/cloud-schedule', cloudScheduleRouter)

module.exports = app => {
  app.use('/', mainRouter)
  app.get('/echotest', (req, res) => {
    console.log('ECHOTEST!')
    res.send('Vroomit API funcionando!')
  })
}
