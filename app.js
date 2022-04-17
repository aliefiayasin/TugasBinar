const express = require('express')
const router = express.Router()
const app = express()
const port = 3000
let posts = require('./db/posts.json') // import
const users = posts

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/game', (req, res) => {
  res.render('game')
})

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Void'
  res.render('greet', {name})
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const {username, email, password} = req.body
  users.push({username, email, password})
  res.redirect('/')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/test', (req, res) => {
  // for (var i = 0; i <= users.length; i++){
    res.status(200).send(`You're successfully login, ${users[0].username} ${users[0].fullname} ${users[0].password}`)
  // }  
})

app.post('/login', (req, res) => {
  const {username, password} = req.body
  let loginStatus = false
   for (var i = 0; i < users.length; i++){
     if (username === users[i].username && password === users[i].password){
        loginStatus = true;
        break;
      }
   }

   if(loginStatus){     
    res.status(200).send(`You're successfully login, ${users[i].fullname}`)
   }else{     
    res.status(200).send(`Login failed`)
   }
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