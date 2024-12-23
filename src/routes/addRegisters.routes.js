import express from 'express'
import DbService from '../services/DbService.js'
import connection from '../libs/db.js'
import { validateStrings, validateParams, validateNumbers } from '../utils/validations.js'

const dbManager = new DbService()
const router = express.Router()

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addTypeProduct', async (req, res) => {
  const { typeProduct } = req.body

  try {
    // validate req.body
    validateParams([typeProduct])

    // validate types
    validateStrings([typeProduct])

    // insert in db or return existing data
    const data = dbManager.findTypeProduct(typeProduct)
    if (data[0]) {
      res.send(`El type product ${data[0]} ya existe`)
    } else {
      connection.execute(
        'INSERT INTO type_product (type_product_name) VALUES (?)',
        [typeProduct]
      )
      res.send('Success')
    }
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la peticion')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addModel', async (req, res) => {
  const { model, description, idTypeProduct, units } = req.body
  try {
    // validate req.body
    validateParams([model, description, idTypeProduct, units])

    // validate types
    validateStrings([model, description, idTypeProduct, units])

    // Insert in db or return the existing data
    const data = await dbManager.findModel(model)
    if (data[0]) {
      res.send('El model ya existe')
    } else {
      connection.execute(
        'INSERT INTO models (name_model, description, id_type_product, units) VALUES (?, ?, ?, ?)',
        [model, description, idTypeProduct, units]
      )
      res.send('model agregado correctamente')
    }
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la peticion')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addProvider', async (req, res) => {
  const { website, tel, email, companyName } = req.body
  try {
    // validate req.body
    validateParams([website, tel, email, companyName])

    // validate types
    validateStrings([website, tel, email, companyName])

    await connection.execute(
      'INSERT INTO providers (website, tel, email, company_name) VALUES (?, ?, ?, ?)',
      [website, tel, email, companyName]
    )
    res.send('Operacion realizada exitosamente')
  } catch (e) {
    console.error(e)
    res.send(400).send('Error en la peticion')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addProduct', async (req, res) => {
  const { stock, idColor, idProvider, price, idModel, isStock } = req.body

  try {
    // Validate req.body
    validateParams([stock, idColor, idProvider, price, idModel, isStock])

    // Validate types
    validateStrings([idColor, idProvider, idModel, isStock])
    validateNumbers([stock, price])

    // Search register in db
    const data = await dbManager.findProduct(idModel, idColor, idProvider)

    // Insert in db or return the existing data
    if (data[0]) {
      res.send(`El producto ${data[0]} ya existe`)
    } else {
      await connection.execute(
        'INSERT INTO list_products (id_model, id_color, id_provider, stock, price, is_stock) VALUES (?, ?, ?, ?, ?, ?)',
        [idModel, idColor, idProvider, stock, price, isStock]
      )
      res.send('Producto agregado correctamente')
    }
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la peticion')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addColor', async (req, res) => {
  const { colorName } = req.body

  try {
    // Validate req.body
    validateParams([colorName])

    // Insert in db or return the existing data
    connection.execute('INSERT INTO colors (color_name) VALUES (?)', [
      colorName
    ])
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la consulta')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/isLogged', (req, res) => {
  if (req.decoded) {
    res.json({ message: 'isLogged' })
  } else {
    res.json({ message: 'isNotLogged' })
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/addCondition', async (req, res) => {
  const { condition } = req.body

  try {
    validateParams([condition])
    validateStrings([condition])
    connection.execute('INSERT INTO conditions (`condition`) VALUES (?)', [
      condition
    ])
    res.send('Condicion agregado correctamente')
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la consulta')
  }
})

export default router
