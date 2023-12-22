const { logger } = require('firebase-functions')
const { getDocumentRef, createDocument } = require('../../../libs/firebase-api-helpers')
const { getFirestore } = require('firebase-admin/firestore')

//Este archivo es para realizar pruebas, para poder hacer triggers manualmente

const deleteDocument = async (req, res) => {
  res.status(200).send({ message: `Endpoint para eliminar docs` })
}

module.exports = { deleteDocument }
