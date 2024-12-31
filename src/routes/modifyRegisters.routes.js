import express from 'express'
import { validateStrings } from '../utils/validations.js'
import DbService from '../services/DbService.js'
const dbManager = new DbService()
const router = express.Router()

router.post('/modifyProduct', async (req, res) => {
  const { idProduct, newPrice, newStock } = req.body
  try {
    validateStrings([idProduct, newPrice, newStock])
    dbManager.updateRegisters(
      'list_products',
      [
        { columnName: 'stock', value: newStock },
        { columnName: 'price', value: newPrice }
      ],
      [{ columnName: 'id_product', value: idProduct }]
    )
    res.status(200).json({ content: 'Success' })
  } catch (e) {
    res.status(400).send('Ha ocurrido un error')
  }
})

export default router
