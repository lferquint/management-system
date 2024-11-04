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
        res.send('El producto se eliminó correctamente')
      }
    }
  } catch (e) {
    console.log(e)
    res.send('Error en la consulta')
  }
})
router.post('/deleteColor/:idColor', async (req, res) => {
  const idColor = req.params.idColor
  try {
    if (typeof idColor !== 'string') {
      throw new Error('Error en la consulta')
    } else {
      const [data] = await connection.execute(
        'DELETE from list_products WHERE id_color=?',
        [idColor]
      )
      const [data2] = await connection.execute(
        'DELETE from colors WHERE id_color=?; ',
        [idColor]
      )
      if (data.affectedRows === 0 && data2.affectedRows === 0) {
        res.status(400).json({ content: 'Error en la consulta' })
        throw new Error('Error en la consulta')
      } else if (data.affectedRows === 0 || data.affectedRows === 0) {
        res.status(500).json({ content: 'Error, los registros no se eliminaron correctamente' })
        throw new Error('Error interno')
      } else {
        res.status(200).json({ content: 'Success' })
      }
    }
  } catch (e) {
    console.log(e)
    res.send('Algo salió mal, intentalo de nuevo')
  }
})
export default router
