import express from 'express'
import connection from '../libs/db.js'

const router = express.Router()

router.post('/deleteProduct/:idProduct', async (req, res) => {
  const idProduct = req.params.idProduct
  try {
    if (typeof idProduct !== 'string') {
      throw new Error('Error en la consulta')
    } else {
      const [data] = await connection.execute(
        'DELETE FROM list_products WHERE id_product=?;',
        [idProduct]
      )
      if (data.affectedRows === 0) {
        res.send('El producto que intentas borrar no existe')
      } else {
        res.send('Todo correcto hermano')
      }
    }
  } catch (e) {
    console.log(e)
    res.send('Error en la consulta')
  }
})
export default router
