import express from 'express'
import authenticationMiddleWare from '../middlewares/authentication.middleware.js'
import DbService from '../services/DbService.js'
import connection from '../libs/db.js'

const dbManager = new DbService()
const router = express.Router()

router.use('/protected', authenticationMiddleWare)

router.get('/protected', (req, res) => {
  res.send(
    'Estas en una pagina ultra SECRETA y protegida que pertenece a la deep web profunda'
  )
})

router.post('/addTypeProduct', async (req, res) => {
  const { typeProduct } = req.body
  try {
    if (typeProduct) {
      const data = await dbManager.findTypeProduct(typeProduct)
      if (data[0]) {
        res.send('El type product ya existe')
      } else {
        connection.execute(
          'INSERT INTO type_product (type_product_name) VALUES (?)',
          [typeProduct]
        )
        res.send('type_product agregado correctamente')
      }
    } else {
      res.status(400).send('Error en la peticion')
      throw new Error('Error en la peticion')
    }
  } catch (e) {
    console.error(e)
  }
})

router.post('/addModel', async (req, res) => {
  const { model, description, idTypeProduct, units } = req.body
  try {
    if (model && description && idTypeProduct && units) {
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
    } else {
      res
        .status(400)
        .send(
          'Error en la peticion, modifique la peticion y vuelva a intentarlo'
        )
      throw new Error('Error en la peticion')
    }
  } catch (e) {
    console.error(e)
  }
})

router.post('/addProvider', (req, res) => {})

router.post('/addProduct', async (req, res) => {
  const { stock, idColor, idProvider, price, idModel } = req.body
  try {
    if (stock && idColor && idProvider && price && idModel) {
      const data = await dbManager.findProduct(idModel, idColor, idProvider)
      if (data[0]) {
        res.send('El producto ya existe')
      } else {
        await connection.execute(
          'INSERT INTO list_products (id_model, id_color, id_provider, stock, price) VALUES (?, ?, ?, ?, ?)',
          [idModel, idColor, idProvider, stock, price]
        )
        res.send('Producto agregado correctamente')
      }
    } else {
      res
        .status(400)
        .send(
          'Error en la peticion. La peticion debe tener la siguiente estructura: { "stock": "number", "idColor": "string", "idProvider": "string", "price": "number","idModel": "string"}'
        )
      throw new Error(
        'Error en la peticion. La peticion debe tener la siguiente estructura: { "stock": "number", "idColor": "string", "idProvider": "string", "price": "number","idModel": "string"}'
      )
    }
  } catch (e) {
    console.error(e)
  }
})

router.post('/isLogged', (req, res) => {
  if (req.decoded) {
    res.json('isLogged')
  }
})

export default router
