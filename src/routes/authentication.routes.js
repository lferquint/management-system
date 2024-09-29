import express from 'express'
const router = express.Router()
const db = {
  user: 'root',
  password: '12345'
}

router.post('/login', (req, res) => {
  if (req.body.user === db.user && req.body.password === db.password) {
    res.cookie('token', 'aaaa').send('Te has logeado correctamente')
  } else {
    res.status(401).send('Unauthorized')
  }
})
router.post('/signIn', (req, res) => {
})

export default router
