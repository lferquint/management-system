import PDFDocument from 'pdfkit-table'
import PdfService from '../services/PdfService.js'
// import fs from 'fs'

async function createPdf(req, res) {
  // class Data {
  //   /**
  //    * type objIntroduction
  //    * @typedef {Object} objIntroduction
  //    * @property {string} nameClient
  //    * @property {string} tel
  //    * @property {number} company
  //    * @property {number} place
  //    */
  //   /**
  //   /**
  //    * Params of class
  //    * @param {objIntroduction} header
  //    * @param {Array.< {nameProduct: string, model: string, amount: number, price: number, description: string, units: string} >} products
  //    * @param {String} deliveryTime
  //    * @param {Array} conditions
  //    * @param {String} signature
  //    */
  //   constructor(header, products, deliveryTime, conditions, signature) {
  //     if (typeof header !== 'object') {
  //       throw new Error('Header parameter must be an object')
  //     }
  //     if (typeof products !== 'object' && typeof products[0] !== 'object') {
  //       throw new Error('Products parameter must be an Array')
  //     }
  //     if (typeof deliveryTime !== 'string') {
  //       throw new Error('DeliveryTime parameter must be a String')
  //     }
  //     if (typeof conditions !== 'object') {
  //       throw new Error('Conditions parameter must be an Array')
  //     }
  //     if (typeof signature !== 'string') {
  //       throw new Error('Signature parameter must be an String')
  //     }
  //     this.header = header
  //     this.products = products
  //     this.deliveryTime = deliveryTime
  //     this.conditions = conditions
  //     this.signature = signature
  //   }
  // }
  // const objConfig = new Data(
  //   {
  //     company: 'VRINTEX',
  //     nameClient: 'Luis Fernando Quintana López',
  //     place: 'CDMX',
  //     tel: '5520491444'
  //   },
  //   [
  //     {
  //       amount: 10,
  //       description: 'Piso conductivo marca lo que sea blablabla',
  //       model: 'Polyflor, lo que sea',
  //       nameProduct: 'Piso conductivo',
  //       price: 10,
  //       units: 'm2'
  //     }
  //   ],
  //   '3 a 4 5 dias habiles posteriores al pago',
  //   ['El tiempo de entrega se considera a partir de recibir en firme la blablablabla'],
  //   'Elias Moreno Vrintex'
  // )

  const data = req.body

  // Start new document
  const doc = new PDFDocument()

  // Create pdfManager
  const pdfManager = new PdfService()

  // Header on the document
  pdfManager.addHeader(doc)

  // Introduction on the document
  pdfManager.addIntroduction(doc, data.header)

  // Add and calculate product quantities
  await pdfManager.addAmounts(doc, data.products)

  // Delivery time
  pdfManager.addDeliveryTime(doc, data.deliveryTime)

  // Conditions to sale
  pdfManager.addConditions(doc, data.conditions)

  // Signature
  pdfManager.addSignature(doc, data.signature)

  // Output

  await doc.pipe(res)
  res.writeHead(200, {
    'Content-Type': 'application/pdf'
  })
  // Finish document
  doc.end()

  // Send response
}
export default createPdf
