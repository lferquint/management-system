import doDate from '../utils/doDate.js'
import formateadorMXN from '../utils/formaterMXN.js'
import ValidationError from '../errors/errors.js'
import {
  calculateIVA,
  calculateSubTotal,
  calculateTotal
} from '../utils/calcuateAmounts.js'

class PdfService {
  constructor(pdfDocument) {
    this.font = 'Helvetica'
    this.pdfDocument = pdfDocument
    this.pendingMessage = 'Pendiente'
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  setFont(newFont) {
    this.font = newFont
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  setDocument(newDocument) {
    this.pdfDocument = newDocument
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  setPendingMessage(text) {
    this.pendingMessage = text
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addText
   * @param {String} text
   */

  addText(text, config) {
    // if (typeof text !== 'string') {
    //   throw new ValidationError('"text" param must be a string ' + text)
    // }
    this.pdfDocument
      .fillColor('black')
      .font(this.font)
      .fontSize(10)
      .text(text, config)
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * @param {String} text
   */

  addTextBold(text, config) {
    if (typeof text !== 'string') {
      throw new ValidationError('"text" param must be a string')
    }
    this.pdfDocument
      .fillColor('black')
      .fontSize(10)
      .font(`${this.font}-Bold`)
      .text(text, config)
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addNote
   * @param {String} text
   */

  addNote(text) {
    if (typeof text !== 'string') {
      throw new ValidationError('text param must be a string')
    }
    this.pdfDocument
      .fillColor('black')
      .fontSize(10)
      .font(`${this.font}-Bold`)
      .text(text, { width: '300' /* Config */ })
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Obj type header for PDF document.
   * @typedef {Object} objIntroduction
   * @property {string} nameClient
   * @property {string} tel
   * @property {string} company
   * @property {string} place
   * @property {string} introductionMessage
   * addIntroduction
   * @param {objIntroduction} objIntroduction
   */

  addIntroduction(objIntroduction) {
    if (!objIntroduction) objIntroduction = {}
    this.addTextBold(objIntroduction.company || this.pendingMessage) // Company name
    this.addText(`ATN. ${objIntroduction.nameClient || this.pendingMessage}`) // Name client
    this.addText(`TEL. ${objIntroduction.tel || this.pendingMessage}`) // Tel client
    this.addText(doDate(new Date()), { align: 'right' }) // Date
    this.pdfDocument.moveDown().moveDown().moveDown()
    this.addText(objIntroduction.introductionMessage || 'Default message introduction') // Introducion message
    this.pdfDocument.moveDown()
    this.addText(`Obra: ${objIntroduction.place || this.pendingMessage}`) // Project address
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Obj type header for PDF document.
   * @typedef {Object} headerConfig
   * @property {string} image
   * @property {string} address
   * @property {string} tel
   * @property {string} email
   * addHeader
   * @param {headerConfig} headerConfig
   */

  addHeader(headerConfig) {
    if (!headerConfig) headerConfig = {}
    const topPosition = 45
    /* this.pdfDocument
      .fontSize(13)
      .font('Courier-Bold')
      .fillColor('gray')
      .text('Division', 260, 45, {
        paragraphGap: 5,
        width: 110,
        align: 'right'
      })
    this.pdfDocument.text('Hospitalaria', {
      paragraphGap: 5,
      width: 110,
      align: 'right'
    }) */

    this.pdfDocument
      .rect(380, topPosition, 0.5, 80) // Line
      .strokeColor('gray')
      .stroke()

    this.pdfDocument
      .rect(70, topPosition + 90, 470, 0.5) // Line
      .strokeColor('gray')
      .stroke()

    this.pdfDocument.image(
      headerConfig.image || './src/assets/logo.jpg', // Location image
      390, // X position
      topPosition + 25,
      { width: 150 }
    )

    this.pdfDocument
      .fontSize(6)
      .fillColor('black')
      .text(
        headerConfig.address || 'San Francisco No. 9, example address', // Address
        70, // X position
        topPosition + 60,
        { paragraphGap: 10 }
      )

    this.pdfDocument
      .fontSize(6)
      .text(
        `Tel: ${headerConfig.tel || '55 5555 5555'} / Email: ${// Tel and email
          headerConfig.email || 'user@example.com.mx'
        }`,
        70, // X position
        topPosition + 70,
        { paragraphGap: 10 }
      )

    this.pdfDocument.moveDown()
    this.pdfDocument.moveDown()
    this.pdfDocument.moveDown()
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addAmounts
   * @param {Object} pdfDocument
   * @param {Array.<{nameProduct: string, model: string, amount: number, price: number, description: string, units: string}>} products
   */

  async addAmounts(products) {
    const granArray = []
    for (let i = 0; i < products.length; i++) {
      const array = []
      array.push(
        products[i].description,
        products[i].amount,
        products[i].units,
        `${formateadorMXN.format(products[i].price).replace('$', '$ ')}`,
        `${formateadorMXN
          .format(products[i].amount * products[i].price)
          .replace('$', '$ ')}`
      )
      granArray.push(array)
    }
    const table = {
      headers: [
        'Descripcion',
        'Cantidad',
        'Unidad',
        'Precio unitario',
        'Importe'
      ],
      rows: granArray,
      options: {
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          this.pdfDocument.font('Helvetica').fontSize(9).text()
        },
        minRowHeight: 20
      }
    }
    await this.pdfDocument
      .moveDown()
      .moveDown()
      .moveDown()
      .table(table, {
        width: 475,
        columnsSize: [185, 70, 70, 70, 75]
      })
    this.pdfDocument
      .font('Helvetica-Bold')
      .text(
        `Subtotal ${formateadorMXN
          .format(calculateSubTotal(products))
          .replace('$', '$ ')}`,
        {
          align: 'right',
          lineGap: 5
        }
      )
    this.pdfDocument.text(
      `IVA ${formateadorMXN
        .format(calculateIVA(calculateSubTotal(products)))
        .replace('$', '$ ')}`,
      {
        align: 'right',
        lineGap: 5
      }
    )
    this.pdfDocument.text(
      `TOTAL ${formateadorMXN
        .format(calculateTotal(calculateSubTotal(products)))
        .replace('$', '$ ')}`,
      {
        align: 'right'
      }
    )
    this.pdfDocument.moveDown().moveDown()
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addDelyveryTime
   * @param {Object} pdfDocument
   * @param {String} deliveryTime
   */
  addDeliveryTime(deliveryTime) {
    this.addText(this.pdfDocument, `Tiempo de entrega: ${deliveryTime}`)
    this.pdfDocument.moveDown()
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addConditions
   * @param {Object} pdfDocument
   * @param {Array} conditions
   */
  addConditions(conditions) {
    this.addNote(this.pdfDocument, 'CONDICIONES DE VENTA:')
    for (let i = 0; i < conditions.length; i++) {
      this.addNote(this.pdfDocument, conditions[i])
    }
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////
  // /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * addSignature
   * @param {Object} pdfDocument
   * @param {String} name
   */
  addSignature(name) {
    this.pdfDocument
      .moveDown()
      .moveDown()
      .moveDown()
      .text('ATTE.', { align: 'center' })
    this.pdfDocument.moveDown().text(name, { align: 'center' })
  }
}
export default PdfService
