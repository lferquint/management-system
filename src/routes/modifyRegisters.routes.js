import express from 'express'
import DbService from '../services/DbService.js'
import connection from '../libs/db.js'

const dbManager = new DbService()
const router = express.Router()

router.get('/protected', (req, res) => {
  res.send(
    'Estas en una pagina ultra SECRETA y protegida que pertenece a la deep web profunda'
  )
})

router.post('/addTypeProduct', async (req, res) => {
  const { typeProduct } = req.body
  console.log(typeProduct)
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

router.post('/addProvider', async (req, res) => {
  const { website, tel, email, companyName } = req.body
  try {
    if (website && tel && email && companyName) {
      await connection.execute('INSERT INTO providers (website, tel, email, company_name) VALUES (?, ?, ?, ?)', [website, tel, email, companyName])
      console.log('Espero que esto esté funcionando')
    } else {
      throw new Error('Error en la consulta')
    }
  } catch (e) {
    res.send('Error en la consulta')
  }
})

router.post('/addProduct', async (req, res) => {
  const { stock, idColor, idProvider, price, idModel, isStock } = req.body
  try {
    if (stock && idColor && idProvider && price && idModel && isStock) {
      const data = await dbManager.findProduct(idModel, idColor, idProvider)
      if (data[0]) {
        res.send('El producto ya existe')
      } else {
        console.log('Minimo estoy llegando aqui')
        await connection.execute(
          'INSERT INTO list_products (id_model, id_color, id_provider, stock, price, is_stock) VALUES (?, ?, ?, ?, ?, ?)',
          [idModel, idColor, idProvider, stock, price, isStock]
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

router.post('/addColor', async (req, res) => {
  const { colorName } = req.body
  try {
    if (colorName) {
      connection.execute('INSERT INTO colors (color_name) VALUES (?)', [colorName])
      res.send('Color agregado correctamente')
    } else {
      throw new Error('Error en la consulta')
    }
  } catch (e) {
    res.send('Error en la consulta')
  }
})

router.post('/isLogged', (req, res) => {
  if (req.decoded) {
    res.json({ message: 'isLogged' })
  } else {
    res.json({ message: 'isNotLogged' })
  }
})

// router.post('updateProduct', (req, res) => {
//   const { price, stock } = req.body
//   connection.execute('UPDATE list_products SET price=? WHERE id_product=?;', [])
// })
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
