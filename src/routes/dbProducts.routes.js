import express from 'express'
const router = express.Router()

router.post('/dbProducts/:action', async(req, res) => {
  const action = req.params.action
  try {
    const handler = await import('../services/getData.js')
    res.send(handler.default[action]('Hola amores'))
  } catch (err) {
    res.send('Action not found')
  }
})

export default router
