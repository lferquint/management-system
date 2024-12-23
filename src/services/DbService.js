import connection from '../libs/db.js'

class DbService {
  /**
   *
   * @param {String} typeProduct
   * @returns {Object} [options] listProducts
   */
  async findTypeProduct(typeProduct) {
    const [data] = await connection.execute(
      'SELECT * FROM type_product WHERE type_product_name=?',
      [typeProduct]
    )
    return data
  }

  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  async findModel(model) {
    const [data] = await connection.execute(
      'SELECT * FROM models WHERE name_model=?',
      [model]
    )
    return data
  }

  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  async findProduct(idModel, idColor, idProvider) {
    const [data] = await connection.execute(
      'SELECT * FROM list_products WHERE id_model=? AND id_color=? AND id_provider=?',
      [idModel, idColor, idProvider]
    )
    return data
  }
  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  async findProvider(model) {
    const [data] = await connection.execute(
      'SELECT * FROM providers WHERE name_model=?',
      [model]
    )
    return data
  }
  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  async findColor(model) {
    const [data] = await connection.execute(
      'SELECT * FROM colors WHERE name_model=?',
      [model]
    )
    return data
  }
  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  async findConditions(model) {
    const [data] = await connection.execute(
      'SELECT * FROM conditions WHERE name_model=?',
      [model]
    )
    return data
  }
}

export default DbService
