const express = require('express')
const app = express()

const port = 3000

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', error => {
  console(error)
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.get('/', (req, res) => {
  res.send('hello world!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})