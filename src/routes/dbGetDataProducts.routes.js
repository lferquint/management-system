import express from 'express'
import connection from '../libs/db.js'
import DbService from '../services/DbService.js'
const router = express.Router()
const dbManager = new DbService()

router.get('/api/getTypeProduct', async (req, res) => {
  // get registers
  const [results] = await dbManager.getRegisters('type_product', ['*'])

  res.json(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getModels/:idTypeProduct', async (req, res) => {
  const { idTypeProduct } = req.params

  // get registers
  const [data] = await dbManager.getRegisters(
    'models', // table name
    ['id_model', 'name_model'], // columns to select
    [{ columnName: 'id_type_product', value: idTypeProduct }] // where conditions
  )

  res.json(data)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getColorsProduct/:idProduct', async (req, res) => {
  const { idProduct } = req.params

  // get registers
  const [results] = await connection.execute(
    'SELECT colors.color_name, colors.id_color FROM colors JOIN list_products ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE models.id_model=?',
    [idProduct]
  )

  res.json(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/infoAboutProduct/:idModel/:idColor', async (req, res) => {
  const { idModel } = req.params
  const { idColor } = req.params

  // get registers
  const [results] = await connection.execute(
    'SELECT list_products.price, models.description, models.units FROM list_products JOIN models ON list_products.id_model=models.id_model JOIN colors ON colors.id_color=list_products.id_color WHERE models.id_model=? AND colors.id_color=?;',
    [idModel, idColor]
  )

  res.json(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getSaleConditions', async (req, res) => {
  // get registers
  const [results] = await connection.execute('SELECT * FROM conditions;')

  res.json(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getAllProducts', async (req, res) => {
  // get registers
  const [results] = await connection.execute(
    'SELECT providers.company_name, type_product.type_product_name, models.name_model, models.description, list_products.stock, list_products.price, colors.color_name, list_products.id_product FROM list_products JOIN models ON list_products.id_model=models.id_model JOIN type_product ON models.id_type_product=type_product.id_type_product JOIN colors ON colors.id_color=list_products.id_color JOIN providers ON providers.id_provider=list_products.id_provider;'
  )

  res.json(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getColorsInStock/:idModel', async (req, res) => {
  const { idModel } = req.params

  // get registers
  const [results] = await connection.execute(
    'SELECT colors.color_name FROM colors JOIN list_products ON list_products.id_color=colors.id_color JOIN models ON list_products.id_model=models.id_model WHERE list_products.is_stock="true" AND models.id_model=? ;',
    [idModel]
  )
  res.send(results)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getAllColors', async (req, res) => {
  // get registers
  const [data] = await dbManager.getRegisters('colors', ['*'])

  res.json(data)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getAllModels', async (req, res) => {
  // get registers
  const [data] = await dbManager.getRegisters('models', ['*'])

  res.json(data)
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.get('/api/getAllProviders', async (req, res) => {
  // get registers
  const [data] = await dbManager.getRegisters('providers', [
    'id_provider',
    'company_name'
  ])

  res.json(data)
})

export default router
