const express = require('express')
const exchangeRateCtrl = require('../controllers/exchange-rate/exchangeRateController')
const exchangeRateRouter = express.Router()

exchangeRateRouter.route('/bcv-dollar-unit').get(exchangeRateCtrl.getBCVDollarUnit)

module.exports = exchangeRateRouter
