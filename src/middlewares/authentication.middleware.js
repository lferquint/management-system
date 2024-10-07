import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })
const router = express.Router()

router.use((req, res, next) => {
  try {
    if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.PRIVATE_KEY)
      req.decoded = decoded
      next()
    } else {
      throw new Error('No tienes token de acceso')
    }
  } catch (e) {
    res.status(401).send('No tienes acceso, debes iniciar sesion')
    console.error(e)
  }
})

export default router
