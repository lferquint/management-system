import express from 'express'
import pdfRouter from './routes/pdf.routes.js'
import prueba from './routes/dbProducts.routes.js'
import cors from 'cors'
const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(prueba)
app.use(pdfRouter)

app.listen(PORT)
console.log('Server on port 3000')
