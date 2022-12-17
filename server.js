if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const iRouter = require('./routes/index')
const tribeRouter = require('./routes/tribes')
const cardRouter = require('./routes/cards')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'8mb', extended:false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('CONNECTED'))

app.use('/', iRouter)
app.use('/tribes', tribeRouter)
app.use('/cards', cardRouter)

app.listen(process.env.PORT || 3002)