const firebaseConfigWeb = {
  apiKey: 'AIzaSyAN_GhnlypjusK6oEnn10US9KKyjR16QWc',
  authDomain: 'carsales-dev-6350a.firebaseapp.com',
  projectId: 'carsales-dev-6350a',
  storageBucket: 'carsales-dev-6350a.appspot.com',
  messagingSenderId: '943837398663',
  appId: '1:943837398663:web:032f41859605c47b2b5a22',
  measurementId: 'G-6THJCX68VL'
};

const openAI = {
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: process.env.OPEN_AI_BASE_URL
}

module.exports = {
  firebaseConfigWeb,
  openAI
}
