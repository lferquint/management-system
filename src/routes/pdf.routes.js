import express from 'express'
import createPdf from '../controllers/pdf.controller.js'
const router = express.Router()

router.post('/generatePdf', createPdf)

export default router
