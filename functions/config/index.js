const env = 'dev'

const firebaseConfigWeb = {
  prod: {
    apiKey: 'AIzaSyDADpm6XUMeyOZJXhSoZSEJaKLo0TzOnwA',
    authDomain: 'vroomit-prod.firebaseapp.com',
    projectId: 'vroomit-prod',
    storageBucket: 'vroomit-prod.appspot.com',
    messagingSenderId: '320839684152',
    appId: '1:320839684152:web:db9b556f581fcd534c96cd',
    measurementId: 'G-BNZGQHPSZ0'
  },
  dev: {
    apiKey: 'AIzaSyAN_GhnlypjusK6oEnn10US9KKyjR16QWc',
    authDomain: 'carsales-dev-6350a.firebaseapp.com',
    projectId: 'carsales-dev-6350a',
    storageBucket: 'carsales-dev-6350a.appspot.com',
    messagingSenderId: '943837398663',
    appId: '1:943837398663:web:032f41859605c47b2b5a22',
    measurementId: 'G-6THJCX68VL'
  }
}[env]

const openAI = {
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: process.env.OPEN_AI_BASE_URL
}

module.exports = {
  firebaseConfigWeb,
  openAI
}
