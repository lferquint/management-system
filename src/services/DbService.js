import connection from '../libs/db.js'

class DbService {
  /**
   * @param {String} tableName
   * @param {Array.<{columnName: string, value: string}>} registersToInsert
   * @returns {object} [options] result
   */
  async insertInDB(tableName, registersToInsert) {
    const valuesCounter = registersToInsert.length
    let cuestionMarks = ''
    let nameAllColumns = ''
    for (let i = 0; i < valuesCounter; i++) {
      if (i === 0) {
        cuestionMarks = '?'
        nameAllColumns = registersToInsert[i].columnName
      } else {
        cuestionMarks = cuestionMarks + ' ?'
        nameAllColumns = nameAllColumns + ', ' + registersToInsert[i].columnName
      }
    }
    const allValuesArray = registersToInsert.map((register) => register.value)
    const [data] = await connection.execute(
      `INSERT INTO ${tableName} (${nameAllColumns}) VALUES (${cuestionMarks}) `,
      allValuesArray
    )
    return data
  }

  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */
  /**
   * @param {String} tableName
   * @param {Array.<{columnName: string, value: string}>} whereConditions
   * @returns {object} [options] result
   */
  async findRegister(tableName, whereConditions) {
    let query = ''
    for (let i = 0; i < whereConditions.length; i++) {
      if (i === 0) {
        query =
          query +
          ` ${whereConditions[i].columnName}="${whereConditions[i].value}"`
      }
      query =
        query +
        ' AND ' +
        `${whereConditions[i].columnName}="${whereConditions[i].value}"`
    }
    const [data] = await connection.execute(
      `SELECT * FROM ${tableName} WHERE${query}`
    )
    return data
  }

  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

  /**
   *
   * @param {String} typeProduct
   * @returns {Array} [options] listProducts
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
