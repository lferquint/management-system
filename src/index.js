import express from 'express'
import pdfRouter from './routes/pdf.routes.js'
import prueba from './routes/dbProducts.routes.js'
const app = express()

const PORT = 3000

app.use(express.json())
app.use(prueba)
app.get('/', (req, res) => {
  res.send('Fernando y las cosas de la web')
})
app.use(pdfRouter)

app.listen(PORT)
console.log('Server on port 3000')
