const { logger } = require('firebase-functions')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { getDocumentRef } = require('../../../libs/firebase-api-helpers')

const onUserCreated = onDocumentCreated('/users/{userId}', async event => {
  const { userId } = event.params
  console.log(`User creado: ${userId}`, event.data.data())
  logger.log(`User creado: ${userId}`, event.data.data())

  const userRef = await getDocumentRef({ collection: 'users', docId: userId })

  return userRef.set({ is_phone_verified: true }, { merge: true })
})

module.exports = {
  onUserCreated
}
