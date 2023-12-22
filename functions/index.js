// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const triggers = require('./triggers')

const { createApiRestServer } = require('./api-rest-server')
const apiRestServer = createApiRestServer()

module.exports = {
  ...triggers,
  apiRestServer
}
