import express from 'express'
import DbService from '../services/DbService.js'
import connection from '../libs/db.js'
import { validateStrings, validateParams } from '../utils/validations.js'

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
    const data = await dbManager.findRegister('type_product', [
      {
        columnName: 'type_product_name',
        value: typeProduct
      }
    ])
    if (data[0]) {
      res.send(`El type product ${data[0]} ya existe`)
    } else {
      dbManager.insertInDB('type_product', [
        { columnName: 'type_product_name', value: typeProduct }
      ])
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
    const data = await dbManager.findRegister('models', [
      { columnName: 'name_model', value: model }
    ])
    if (data[0]) {
      res.send('El model ya existe')
    } else {
      dbManager.insertInDB('models', [
        { columnName: 'name_model', value: model },
        { columnName: 'description', value: description },
        { columnName: 'id_type_product', value: idTypeProduct },
        { columnName: 'units', value: units }
      ])
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

    dbManager.insertInDB('providers', [
      { columnName: 'website', value: website },
      { columnName: 'tel', value: tel },
      { columnName: 'email', value: email },
      { columnName: 'company_name', value: companyName }
    ])

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

    // Search register in db
    const data = await dbManager.findRegister('list_products', [
      { columnName: 'id_model', value: idModel },
      { columnName: 'id_color', value: idColor },
      { columnName: 'id_provider', value: idProvider },
      { columnName: 'is_stock', value: isStock }
    ])

    // Insert in db or return the existing data
    if (data[0]) {
      res.send(`El producto ${data[0]} ya existe`)
    } else {
      dbManager.insertInDB('providers', [
        { columnName: 'id_model', value: idModel },
        { columnName: 'id_color', value: idColor },
        { columnName: 'id_provider', value: idProvider },
        { columnName: 'stock', value: stock },
        { columnName: 'price', value: price },
        { columnName: 'is_stock', value: isStock }
      ])
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
    dbManager.insertInDB('conditions', [
      { columnName: 'condition', value: condition }
    ])
    res.send('Condicion agregado correctamente')
  } catch (e) {
    console.error(e)
    res.status(400).send('Error en la consulta')
  }
})

export default router
