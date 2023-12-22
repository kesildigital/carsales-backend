const express = require('express')
const authCtrl = require('../controllers/auth')
const authRouter = express.Router()

authRouter.route('/login').post(authCtrl.login)
authRouter.route('/update-pass').post(authCtrl.updatePassword)

module.exports = authRouter
