import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
const PORT = 3306

const connection = await mysql.createConnection({
  host: 'localhost',
  port: PORT,
  user: 'root',
  database: 'vrintex2',
  password: process.env.DB_PASSWORD
})
export default connection
