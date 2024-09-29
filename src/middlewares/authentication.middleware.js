import express from 'express'
const router = express.Router()

router.use((req, res, next) => {
  if (req.cookies.token === 'aaaa') {
    next()
  } else {
    res
      .status(401)
      .send(
        'NO TIENES AUTORIZACION para entrar a la deep web profunda, pero te daremos la oportunidad'
      )
  }
})

export default router
