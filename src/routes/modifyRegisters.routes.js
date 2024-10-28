import express from 'express'
import connection from '../libs/db.js'
const router = express.Router()

router.post('/modifyProduct', async (req, res) => {
  const { idProduct, newPrice, newStock } = req.body
  await connection.execute('UPDATE list_products SET stock = ?, price=? WHERE id_product = ?', [newStock, newPrice, idProduct])
  res.send('Todo en orden')
})

export default router
