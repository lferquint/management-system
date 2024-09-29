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
app.use(cors())
app.use(express.json())
app.use(login, prueba, modifyRegister, pdfRouter)

app.listen(PORT)
console.log('Server on port 3000')
