const firebaseConfigWeb = {
  apiKey: 'AIzaSyDADpm6XUMeyOZJXhSoZSEJaKLo0TzOnwA',
  authDomain: 'vroomit-prod.firebaseapp.com',
  projectId: 'vroomit-prod',
  storageBucket: 'vroomit-prod.appspot.com',
  messagingSenderId: '320839684152',
  appId: '1:320839684152:web:db9b556f581fcd534c96cd',
  measurementId: 'G-BNZGQHPSZ0'
}

const openAI = {
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: process.env.OPEN_AI_BASE_URL
}

module.exports = {
  firebaseConfigWeb,
  openAI
}
