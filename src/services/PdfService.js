import doDate from '../utils/doDate.js'
import formateadorMXN from '../utils/formaterMXN.js'
import {
  calculateIVA,
  calculateSubTotal,
  calculateTotal
} from '../utils/calcuateAmounts.js'

class Pdf {
  /**
   * addText
   * @param {Object} pdfDocument
   * @param {String} text
   */
  addText(pdfDocument, text) {
    pdfDocument
      .fillColor('black')
      .font('Helvetica')
      .fontSize(10)
      .text(`${text}`)
  }

  /**
   * addNote
   * @param {Object} pdfDocument
   * @param {String} text
   */
  addNote(pdfDocument, text) {
    pdfDocument
      .fillColor('black')
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(`${text}`, {
        width: '300'
      })
  }

  /**
   * Obj type header for PDF document.
   * @typedef {Object} Header
   * @property {string} nameClient
   * @property {string} tel
   * @property {string} company
   * @property {string} place
   * addIntroduction
   * @param {Object} pdfDocument
   * @param {Header} objHeaders
   */
  addIntroduction(pdfDocument, objHeaders) {
    pdfDocument
      .fillColor('black')
      .font('Helvetica-Bold')
      .fontSize(10)
      .text(objHeaders.company)
    pdfDocument.text(`ATN. ${objHeaders.nameClient}`)
    pdfDocument.text(`TEL. ${objHeaders.tel}`)
    pdfDocument.font('Helvetica').text(doDate(new Date()), {
      align: 'right'
    })
    pdfDocument
      .moveDown()
      .moveDown()
      .moveDown()
      .text(
        `Por medio de la presente ponemos a su atenta consideracion la cotizacion de ${objHeaders.company}`
      )
    pdfDocument.moveDown().text(`Obra: ${objHeaders.place}`)
  }

  /**
   * addHeader
   * @param {Object} pdfDocument
   */
  addHeader(pdfDocument) {
    const topPosition = 45
    pdfDocument
      .fontSize(13)
      .font('Courier-Bold')
      .fillColor('gray')
      .text('Division', 260, 45, {
        paragraphGap: 5,
        width: 110,
        align: 'right'
      })
    pdfDocument.text('Hospitalaria', {
      paragraphGap: 5,
      width: 110,
      align: 'right'
    })
    pdfDocument.rect(380, topPosition, 0.5, 80).strokeColor('gray').stroke()

    pdfDocument
      .rect(70, topPosition + 90, 470, 0.5)
      .strokeColor('gray')
      .stroke()

    pdfDocument.image('./src/assets/logo.jpg', 390, topPosition + 25, {
      // fit: [100, 100],
      width: 150
    })
    pdfDocument
      .fontSize(6)
      .fillColor('black')
      .text(
        'San Francisco No. 9, Col. San Jerónimo Aculco, D.F.',
        70,
        topPosition + 60,
        {
          paragraphGap: 10
        }
      )
    pdfDocument
      .fontSize(6)
      .text(
        'Tels. (55) 5631-2039 / Email: vrintecsistemasdesalud@yahoo.com.mx',
        70,
        topPosition + 70,
        {
          paragraphGap: 10
        }
      )
    pdfDocument.moveDown()
    pdfDocument.moveDown()
    pdfDocument.moveDown()
  }

  /**
   * addAmounts
   * @param {Object} pdfDocument
   * @param {Array.<{nameProduct: string, model: string, amount: number, price: number, description: string, units: string}>} products
   */
  async addAmounts(pdfDocument, products) {
    const granArray = []
    for (let i = 0; i < products.length; i++) {
      const array = []
      array.push(
        products[i].description,
        products[i].amount,
        products[i].units,
        `${formateadorMXN.format(products[i].price).replace('$', '$ ')}`,
        `${formateadorMXN.format(products[i].amount * products[i].price).replace('$', '$ ')}`
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
          pdfDocument.font('Helvetica').fontSize(9).text()
        }
      }
    }
    await pdfDocument
      .moveDown()
      .moveDown()
      .moveDown()
      .table(table, {
        width: 475,
        columnsSize: [185, 70, 70, 70, 75]
      })
    pdfDocument
      .font('Helvetica-Bold')
      .text(`Subtotal ${formateadorMXN.format(calculateSubTotal(products)).replace('$', '$ ')}`, {
        align: 'right',
        lineGap: 5
      })
    pdfDocument.text(
      `IVA ${formateadorMXN.format(calculateIVA(calculateSubTotal(products))).replace('$', '$ ')}`,
      {
        align: 'right',
        lineGap: 5
      }
    )
    pdfDocument.text(
      `TOTAL ${formateadorMXN.format(
        calculateTotal(calculateSubTotal(products))
      ).replace('$', '$ ')}`,
      {
        align: 'right'
      }
    )
    pdfDocument.moveDown().moveDown()
  }

  /**
   * addDelyveryTime
   * @param {Object} pdfDocument
   * @param {String} deliveryTime
   */
  addDeliveryTime(pdfDocument, deliveryTime) {
    this.addText(pdfDocument, `Tiempo de entrega: ${deliveryTime}`)
    pdfDocument.moveDown()
  }

  /**
   * addConditions
   * @param {Object} pdfDocument
   * @param {Array} conditions
   */
  addConditions(pdfDocument, conditions) {
    for (let i = 0; i < conditions.length; i++) {
      this.addNote(pdfDocument, conditions[i])
    }
  }

  /**
   * addSignature
   * @param {Object} pdfDocument
   * @param {String} name
   */
  addSignature(pdfDocument, name) {
    pdfDocument.moveDown().moveDown().moveDown().text('ATTE.', { align: 'center' })
    pdfDocument.moveDown().text(name, { align: 'center' })
  }
}
export default Pdf
