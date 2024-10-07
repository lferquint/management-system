import express from 'express'
import connection from '../libs/db.js'
const router = express.Router()

router.get('/api/getTypeProduct', async (req, res) => {
  const [results] = await connection.query('SELECT * FROM type_product')
  res.json(results)
})
router.get('/api/getModels/:idTypeProduct', async (req, res) => {
  const [results] = await connection.execute(
    'SELECT models.id_model, models.name_model FROM models WHERE id_type_product=?',
    [req.params.idTypeProduct]
  )
  const dataConverted = results.map((element) => {
    return { id_model: element.id_model, name_model: element.name_model }
  })
  res.json(dataConverted)
})
router.get('/api/getColorsProduct/:idProduct', async (req, res) => {
  const [results] = await connection.execute(
    'SELECT colors.color_name, colors.id_color FROM list_products JOIN colors ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE models.id_model=?;',
    [req.params.idProduct]
  )
  // const dataConverted = results.map((element) => {
  //   return element.color_name
  // })
  res.json(results)
})
router.get('/api/infoAboutProduct/:idModel/:color', async (req, res) => {
  const [results] = await connection.execute(
    'SELECT list_products.price, models.description, models.units FROM list_products JOIN models ON list_products.id_model=models.id_model JOIN colors ON colors.id_color=list_products.id_color WHERE models.id_model=? AND colors.color_name=?;',
    [req.params.idModel, req.params.color]
  )
  res.json(results)
})
router.get('/api/getSaleConditions', async (req, res) => {
  const [results] = await connection.execute('SELECT * FROM conditions;')
  res.json(results)
})

export default router
