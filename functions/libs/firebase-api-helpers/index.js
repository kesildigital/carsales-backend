const { getFirestore } = require('firebase-admin/firestore')

async function get(params) {
  const { collection, filters = [], orderBy, limit } = params
  let query = getFirestore().collection(collection)

  filters.forEach(filter => {
    const { field, operator, value } = filter
    query = query.where(field, operator, value)
  })

  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const snapshot = await query.get()
  const results = snapshot.docs
  return results
}

const getDocumentRef = async ({ collection, docId }) => {
  return await getFirestore().collection(collection).doc(docId)
}

const createDocument = async ({ collection, doc }) => {
  return await getFirestore().collection(collection).add(doc)
}

async function getOne(params) {
  const { collection, filters = [], orderBy } = params
  let query = getFirestore().collection(collection)

  filters.forEach(filter => {
    const { field, operator, value } = filter
    query = query.where(field, operator, value)
  })

  if (orderBy) {
    query = query.orderBy(orderBy.field, orderBy.direction)
  }

  const snapshot = await query.limit(1).get()
  const results = snapshot.docs

  return results[0]
}

module.exports = {
  get,
  getOne,
  getDocumentRef,
  createDocument
}
