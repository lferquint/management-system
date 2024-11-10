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
        throw new Error('Error en la consulta')
      } else {
        res.status(200).json({ content: 'Success' })
      }
    }
  } catch (e) {
    console.log(e)
    res.send('Algo salió mal, intentalo de nuevo')
  }
})
router.post('/deleteTypeProduct/:idTypeProduct', async (req, res) => {
  const idTypeProduct = req.params.idTypeProduct
  try {
    if (!idTypeProduct) {
      throw new Error('Error en la consulta, el parametro es incorrecto')
    } else {
      const [data] = await connection.execute(
        'SELECT * FROM models WHERE id_type_product=?',
        [idTypeProduct]
      )
      const idsModel = data.map((register) => {
        return register.id_model
      })

      for (const id of idsModel) {
        await connection.execute('DELETE FROM list_products WHERE id_model=?', [id])
      }
      await connection.execute('DELETE FROM models WHERE id_type_product=?', [idTypeProduct])
      await connection.execute('DELETE FROM type_product WHERE id_type_product=?', [idTypeProduct])
      res.send('Lo que sea hermano')
    }
  } catch (e) {
    console.log(e)
  }
})
router.post('/deleteModel/:idModel', async (req, res) => {
  const idModel = req.params.idModel
  try {
    if (!idModel) {
      throw new Error('Error en la consulta, el parametro es incorrecto')
    } else {
      await connection.execute('DELETE FROM list_products WHERE id_model=?', [idModel])
      await connection.execute('DELETE FROM models WHERE id_model=?', [idModel])
      res.send('Lo que sea hermano')
    }
  } catch (e) {
    console.log(e)
  }
})
router.post('/deleteProvider/:idProvider', async (req, res) => {
  const idProvider = req.params.idProvider
  try {
    if (!idProvider) {
      throw new Error('Error en la consulta, el parametro es incorrecto')
    } else {
      await connection.execute('DELETE FROM list_products WHERE id_provider=?', [idProvider])
      await connection.execute('DELETE FROM providers WHERE id_provider=?', [idProvider])
      res.send('Success')
    }
  } catch (e) {
    console.log(e)
  }
})
router.post('/deleteCondition/:idCondition', async (req, res) => {
  const idCondition = req.params.idCondition
  try {
    if (!idCondition) {
      throw new Error('Error en la consulta, el parametro es incorrecto')
    } else {
      await connection.execute('DELETE FROM conditions WHERE id_conditions=?', [idCondition])
      res.send('Success')
    }
  } catch (e) {
    console.log(e)
  }
})
export default router
