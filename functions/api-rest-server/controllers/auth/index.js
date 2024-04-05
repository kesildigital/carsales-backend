const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const { getAuth: adminAuth } = require('firebase-admin/auth')
const { logger } = require('firebase-functions')

const { firebaseAppInstance } = require('../../../app')

// Initialize Firebase
const auth = getAuth(firebaseAppInstance)

const login = async (req, res) => {
  logger.log(req.body)
  logger.log(req.headers)

  const { email, password } = req.body

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    res.status(200).send({ userCredential })
  } catch (error) {
    logger.error(error)
    res.status(400).json({ error })
  }
}

const updatePassword = async (req, res) => {
  const { uid, password } = req.body

  try {
    const userCredential = await adminAuth().updateUser(uid, {
      password: password
    })

    res.status(200).send({ userCredential })
  } catch (error) {
    logger.error(error)
    res.status(400).json({ error })
  }
}

const deleteAuthUser = async (req, res) => {
  const { uid } = req.body

  try {
    await adminAuth().deleteUser(uid)

    res.status(200).json({ message: 'Usuario eliminado con exito' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error })
  }
}

module.exports = {
  login,
  updatePassword,
  deleteAuthUser
}
