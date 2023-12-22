const { getFirestore } = require('firebase-admin/firestore')

const get = async ({ collection, filter }) => {
  return await getFirestore().collection(collection).where(filter)
}

const getDocumentRef = async ({ collection, docId }) => {
  return await getFirestore().collection(collection).doc(docId)
}

const createDocument = async ({ collection, doc }) => {
  return await getFirestore().collection(collection).add(doc)
}

module.exports = {
  get,
  getDocumentRef,
  createDocument
}
