const firebaseConfigWeb = {
  apiKey: 'AIzaSyCisJzY9SKgIa7mgLYinOoJvaAjFLB8FIk',
  authDomain: 'gohandypro-a8af9.firebaseapp.com',
  databaseURL: 'https://gohandypro-a8af9-default-rtdb.firebaseio.com',
  projectId: 'gohandypro-a8af9',
  storageBucket: 'gohandypro-a8af9.appspot.com',
  messagingSenderId: '209257459112',
  appId: '1:209257459112:web:2c7b96c2c0b5c0d364819d',
  measurementId: 'G-BY15HX0EL9'
}

const openAI = {
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: process.env.OPEN_AI_BASE_URL
}

module.exports = {
  firebaseConfigWeb,
  openAI
}
