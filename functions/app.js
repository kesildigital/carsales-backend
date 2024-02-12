const firebaseApp = require('firebase/app')
const firebaseAdminApp = require('firebase-admin/app')
const { firebaseConfigWeb } = require('./config')

const firebaseModule = (function () {
  let firebaseAppInstance = null
  let firebaseAdminAppInstance = null

  function initializeApps() {
    if (!firebaseAppInstance) {
      firebaseAppInstance = firebaseApp.initializeApp(firebaseConfigWeb)
    }

    if (!firebaseAdminAppInstance) {
      firebaseAdminAppInstance = firebaseAdminApp.initializeApp(firebaseConfigWeb)
    }
  }

  if (!firebaseAppInstance || !firebaseAdminAppInstance) {
    initializeApps()
  }

  return {
    firebaseAppInstance,
    firebaseAdminAppInstance
  }
})()

module.exports = firebaseModule
