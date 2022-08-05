const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Url = require('./models/url')

const app = express()
const port = 3000

const mongoose = require('mongoose')

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

// 設定一條新的路由，接住新生成的短網址，並把資料送往 database。
app.post('/', (req, res) => {
  const url = req.body.url
  const short = random()

  Url.findOne({ originalUrl: url })
    .then(data => {
      if (data) {  // 比對網址，若和曾貼過的一樣，則回傳之前建立的短址
        return data
      } else {  // 比對網址，若無和先前資料無一相同，則生成新短址
        return Url.create({ shortUrl: short, originalUrl: url })
      }
    })
    .then(data =>
      res.render('results', {
        origin: req.headers.origin,
        originalUrl: url,
        shortUrl: data.shortUrl,
      })
    )
    .catch(error => console.log(error))
})


// 新增?縮短後
app.get('/url/new', (req, res) => {
  return res.render('new')
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})


const random = (length = 5) => {
  let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}