import express from 'express'
import authenticationMiddleWare from '../middlewares/authentication.middleware.js'
const router = express.Router()

router.use(authenticationMiddleWare)
router.get('/protected', (req, res) => {
  res.send('Estas en una pagina ultra SECRETA y protegida que pertenece a la deep web profunda')
})

export default router
