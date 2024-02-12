const firebaseConfigWeb = {
  apiKey: 'AIzaSyDRb66QgtAbZC67ZrCKu_gthQHEK1BX2tE',
  authDomain: 'mechanic-dev-369a5.firebaseapp.com',
  projectId: 'mechanic-dev-369a5',
  storageBucket: 'mechanic-dev-369a5.appspot.com',
  messagingSenderId: '758393483976',
  appId: '1:758393483976:web:0af87b86a39d73240b2bfd',
  measurementId: 'G-WDSFSD6KP7'
};

const openAI = {
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: process.env.OPEN_AI_BASE_URL
}

module.exports = {
  firebaseConfigWeb,
  openAI
}
