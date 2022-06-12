const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const { PORT = 8000 } = process.env

// Pertama, setting request body parser
// (Ingat! Body parser harus ditaruh paling atas)
app.use(express.urlencoded({ extended: false }))

// Kedua, setting session handler
app.use(session({
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized: false
}))

// Ketiga, setting passport
// (sebelum router dan view engine)
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

// Keempat, setting flash
app.use(flash())

// Kelima, setting view engine
app.set('view engine', 'ejs')

// Keenam, setting router
const router = require('./router')

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router)
app.listen(PORT, () => {
    console.log(`Server nyala di port ${PORT}`)
})