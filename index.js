// index.js
const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
const { Article } = require('./models')
app.use(express.json())

// Catatan: Kita perlu tambahkan line ini sebelum use router
// Kita pakai untuk handle request dari form
app.use(
    express.urlencoded({
        extended: false
    })
)

// Kita pakai untuk memasang view engine EJS
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.get('/articles/create', (req, res) => {
    res.render('articles/create')
})

// // GET /articles/create, menampilkan form create
// app.get('/articles/create', (req, res) => {
//     res.render('articles/create')
// })

// index.js
app.get('/articles', (req, res) => {
    Article.findAll()
        .then(articles => {
            res.render('articles/index', {
                articles
            })
        })
})

// index.js
app.get('/articles/:id', (req, res) => {
    Article.findOne({
        where: { id: req.params.id }
    })
        .then(article => {
            // res.json(article.title)
            // Karena hasil dari promise findOne adalah object,
            // Maka bisa kita lempar langsung ke method render
                res.render('articles/show', {title:article.title, article})
        })
})

// PUT an article
app.put('/articles/:id', (req, res) => {
    Article.update({
        title: req.body.title,
        body: req.body.body,
        approved: req.body.approved
    }, {
        where: { id: req.params.id }
    })
        .then(article => {
            res.status(201).json(article)
        }).catch(err => {
            res.status(422).json("Can't create article")
        })
})

// POST /articles, buat artikel baru
app.post('/articles', (req, res) => {
    Article.create({
        title: req.body.title,
        body: req.body.body
    })
        .then(article => {
            res.status(200).send('Article berhasil dibuat')
        })
})


var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(router)