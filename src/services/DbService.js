import connection from '../libs/db.js'

class DbService {
  /* -------------------------------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------------------------------- */

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
}

export default DbService
