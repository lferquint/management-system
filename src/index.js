import express from 'express'
import pdfRouter from './routes/pdf.routes.js'
import prueba from './routes/dbProducts.routes.js'
import modifyRegister from './routes/modifyRegisters.routes.js'
import login from './routes/authentication.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const PORT = 3000

app.use(cookieParser())
// app.use(cors({
//   credentials: true
// }))
app.use(
  cors({
    origin: 'http://localhost:5173', // Reemplaza con el dominio de tu frontend
    credentials: true // Permite el envío de cookies
  })
)

app.use(express.json())
app.use(pdfRouter, login, prueba, modifyRegister)

app.listen(PORT)
console.log('Server on port 3000')
