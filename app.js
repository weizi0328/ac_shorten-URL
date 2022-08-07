const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const Url = require('./models/url')
const shortenUrl = require('./utils/shortenUrl')

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

// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))


// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 設定一條新的路由，接住新生成的短網址，並把資料送往 database。
app.post('/', (req, res) => {
  if (!req.body.url) return res.redirect('/')
  const shortUrl = shortenUrl(5)

  Url.findOne({ originalUrl: req.body.url })
    .then(data =>
      // 比對網址，若和曾貼過的相同，則回傳之前建立的短址；
      // 若無和先前資料相同，則生成新短址
      // 條件 ? 值1 : 值2
      // 若條件為true，回傳值1，否則回傳值2
      data ? data : Url.create({ shortUrl, originalUrl: req.body.url })
    )
    .then(data =>
      res.render('results', {
        origin: req.headers.origin,
        originalUrl: req.body.url,
        shortUrl: data.shortUrl,
      })
    )
    .catch(error => console.log(error))
})


// 新增短址路由，讓短址可以連接到原網址
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params

  Url.findOne({ shortUrl })
    .then(data => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Cannot find the Url",
          errorUrl: req.headers.host + '/' + shortUrl,
        })
      }
      res.redirect(data.originalUrl)
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})