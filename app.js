const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', error => {
  console(error)
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 新增?縮短後
app.get('/url/new', (req, res) => {
  return res.render('new')
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})