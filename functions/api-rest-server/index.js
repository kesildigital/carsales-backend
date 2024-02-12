require('dotenv').config()
const { onRequest } = require('firebase-functions/v2/https')
const express = require('express')
const expressApp = express()
const routes = require('./routes')

function createApiRestServer() {
  //Rutas
  routes(expressApp)

  //Levanta el servicio
  const apiRestServer = onRequest({ cors: true }, expressApp)

  return apiRestServer
}

module.exports = { createApiRestServer }
