const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
let posts = require('./db/posts.json') // import

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/game', (req, res) => {
  res.render('game')
})

app.get('/api/v1/posts', (req,res) =>{
  res.status(200).json(posts);
})

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(router)

//internal server error
app.use(function(err, req, res, next){
  console.log(err)
  res.status(500).json({
    status: 'fail',
    error: err.message
  })
})

//404 handler
app.use(function(req, res) {
  res.status(404).json({
    status: 'fail',
    error: 'Are you lost?'
  })
})