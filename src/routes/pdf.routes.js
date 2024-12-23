import express from 'express'
import PDFDocument from 'pdfkit-table'
import PdfService from '../services/PdfService.js'
const router = express.Router()

router.post('/generatePdf', async (req, res) => {
  const data = req.body

  // Start new document
  const doc = new PDFDocument()

  // Create pdfManager
  const pdfManager = new PdfService(doc)

  // Header on the document
  pdfManager.addHeader()

  // Introduction on the document
  pdfManager.addIntroduction(data.header)

  // Add and calculate product quantities
  await pdfManager.addAmounts(data.products)

  // Delivery time
  pdfManager.addDeliveryTime(data.deliveryTime)

  // Conditions to sale
  pdfManager.addConditions(data.conditions)

  // Signature
  pdfManager.addSignature(data.signature)

  // Output
  doc.pipe(res)
  res.writeHead(200, {
    'Content-Type': 'application/pdf'
  })

  // Finish document
  doc.end()
})

export default router
