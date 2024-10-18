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
    // 'SELECT colors.color_name, colors.id_color FROM list_products JOIN colors ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE models.id_model=?;',
    'SELECT colors.color_name, colors.id_color FROM colors JOIN list_products ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE models.id_model=?',
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
router.get('/api/getAllProducts', async (req, res) => {
  const [results] = await connection.execute(
    'SELECT providers.company_name, type_product.type_product_name, models.name_model, models.description, list_products.stock, list_products.price, colors.color_name, list_products.id_product FROM list_products JOIN models ON list_products.id_model=models.id_model JOIN type_product ON models.id_type_product=type_product.id_type_product JOIN colors ON colors.id_color=list_products.id_color JOIN providers ON providers.id_provider=list_products.id_provider;'
  )
  res.json(results)
})
router.get('/api/getColorsInStock/:idModel', async (req, res) => {
  const idModel = req.params.idModel
  const [results] = await connection.execute(
    'SELECT colors.color_name FROM colors JOIN list_products ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE list_products.is_stock="true" AND models.id_model=? ;',
    [idModel]
  )
  res.send(results)
})

// Temporal routes
router.get('/api/getAllColors', async (req, res) => {
  const [data] = await connection.execute('SELECT * FROM colors')
  res.json(data)
})
router.get('/api/getAllModels', async (req, res) => {
  const [data] = await connection.execute('SELECT * FROM models')
  res.json(data)
})
router.get('/api/getAllProviders', async (req, res) => {
  const [data] = await connection.execute('SELECT id_provider, company_name FROM providers')
  res.json(data)
})

export default router
