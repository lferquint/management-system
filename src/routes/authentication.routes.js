import express from 'express'
import AuthenticationService from '../services/AuthenticationService.js'
const router = express.Router()
const auth = new AuthenticationService()

router.post('/login', async (req, res) => {
  const isAuth = await auth.logIn(req.body.username, req.body.password)
  if (isAuth) {
    const objToSign = { username: req.body.username }
    const token = auth.getToken(objToSign)
    res
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax'
      })
      .json('Te logeaste correctamente')
  } else {
    res.status(401).json('Error al logearte')
  }
})

router.post('/signIn', (req, res) => {})

export default router
