const express = require('express')
const authCtrl = require('../controllers/auth')
const authRouter = express.Router()

authRouter.route('/login').post(authCtrl.login)
authRouter.route('/update-pass').post(authCtrl.updatePassword)
authRouter.route('/delete-user').post(authCtrl.deleteAuthUser)

module.exports = authRouter
