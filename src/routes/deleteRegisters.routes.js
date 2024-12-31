import express from 'express'
import { validateFalsyValues } from '../utils/validations.js'
import DbService from '../services/DbService.js'
const dbManager = new DbService()

const router = express.Router()

router.post('/deleteProduct/:idProduct', async (req, res) => {
  const { idProduct } = req.params

  try {
    // validate types
    validateFalsyValues([idProduct])

    // try delete register
    const [data] = await dbManager.deleteRegisters('list_products', [
      { columnName: 'id_product', value: idProduct }
    ])

    // handle sql query result
    if (data.affectedRows === 0) {
      res.send('El producto que intentas borrar no existe')
    } else {
      res.status(200).json({ content: 'Success' })
    }
  } catch (e) {
    console.error(e)
    res.status(400).send('Ha ocurrido un error')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/deleteColor/:idColor', async (req, res) => {
  const { idColor } = req.params
  try {
    // validate types
    validateFalsyValues([idColor])

    // try delete registers
    const [data] = await dbManager.deleteRegisters('list_products', [
      { columnName: 'id_color', value: idColor }
    ])
    const [data2] = await dbManager.deleteRegisters('colors', [
      { columnName: 'id_color', value: idColor }
    ])

    // handle sql query result
    if (data.affectedRows === 0 && data2.affectedRows === 0) {
      throw new Error('Error en la consulta')
    } else {
      res.status(200).json({ content: 'Success' })
    }
  } catch (e) {
    console.log(e)
    res.status(400).send('Ha ocurrido un error')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/deleteTypeProduct/:idTypeProduct', async (req, res) => {
  const { idTypeProduct } = req.params
  try {
    // validate types
    validateFalsyValues([idTypeProduct])

    // get models to delete
    const [data] = await dbManager.getRegisters(
      'models',
      ['*'],
      [{ columnName: 'id_type_product', value: idTypeProduct }]
    )

    // get only IDs from all models
    const idsModel = data.map((register) => {
      return register.id_model
    })

    // delete products use the previous IDs
    for (const id of idsModel) {
      await dbManager.deleteRegisters('list_products', [
        { columnName: 'id_model', value: id }
      ])
    }

    // delete models
    await dbManager.deleteRegisters('models', [
      { columnName: 'id_type_product', value: idTypeProduct }
    ])

    // delete typeProduct
    await dbManager.deleteRegisters('type_product', [
      { columnName: 'id_type_product', value: idTypeProduct }
    ])
    res.status(200).json({ content: 'Success' })
  } catch (e) {
    console.log(e)
    res.status(400).send('Ha ocurrido un error')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/deleteModel/:idModel', async (req, res) => {
  const { idModel } = req.params
  try {
    validateFalsyValues(idModel)

    await dbManager.deleteRegisters('list_products', [
      { columnName: 'id_model', value: idModel }
    ])

    await dbManager.deleteRegisters('models', [
      { columnName: 'id_model', value: idModel }
    ])
    res.status(200).json({ content: 'Success' })
  } catch (e) {
    console.log(e)
    res.status(400).send('Ha ocurrido un error')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/deleteProvider/:idProvider', async (req, res) => {
  const { idProvider } = req.params
  try {
    validateFalsyValues([idProvider])

    await dbManager.deleteRegisters('list_products', [
      { columnName: 'id_provider', value: idProvider }
    ])

    await dbManager.deleteRegisters('providers', [
      { columnName: 'id_provider', value: idProvider }
    ])

    res.status(200).json({ content: 'Success' })
  } catch (e) {
    console.log(e)
    res.status(400).send('Ha ocurrido un error')
  }
})

/* -------------------------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------------------------- */

router.post('/deleteCondition/:idCondition', async (req, res) => {
  const { idCondition } = req.params
  try {
    validateFalsyValues([idCondition])

    await dbManager.deleteRegisters('conditions', [
      { columnName: 'id_conditions', value: idCondition }
    ])

    res.status(200).json({ content: 'Success' })
  } catch (e) {
    console.log(e)
    res.status(400).send('Ha ocurrido un error')
  }
})
export default router
