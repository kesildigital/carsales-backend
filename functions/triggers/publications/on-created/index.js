const { logger } = require('firebase-functions')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { getDocumentRef } = require('../../../libs/firebase-api-helpers')

const onPublicationCreated = onDocumentCreated('/publications/{publicationId}', async event => {
  const { publicationId } = event.params
  logger.log(`Publication creada: ${publicationId}`, event.data.data())

  const publicationsRef = await getDocumentRef({ collection: 'publications', docId: publicationId })

  return publicationsRef.set({ has_inspection_appointment: false }, { merge: true })
})

module.exports = {
  onPublicationCreated
}
