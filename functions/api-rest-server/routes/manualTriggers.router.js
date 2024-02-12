const express = require('express')
const manualTriggerCtrl = require('../controllers/manual-triggers')
const manualTriggerRouter = express.Router()

manualTriggerRouter.route('/delete-document').get(manualTriggerCtrl.deleteDocument)

module.exports = manualTriggerRouter
