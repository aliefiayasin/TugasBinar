const express = require('express')
const Sequelize = require('sequelize')
const router = express.Router()
const app = express()
const port = 3000
let posts = require('./db/posts.json') // import
const { user_games, user_game_biodata, user_game_history } = require('./models')
const users = posts
let isLogin = false
let user

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render('index', { isLogin, user })
})

app.get('/game', (req, res) => {
  res.render('game')
})


//#region admin
user_game_biodata.belongsTo(user_games, { foreignKey: 'user_game_id' })
user_game_history.belongsTo(user_games, { foreignKey: 'user_game_id' })
user_game_biodata.hasMany(user_game_history, { foreignKey: 'user_game_id' })

app.post('/users/delete', (req, res) => {
  user_games.destroy({ where: { id: req.body.deleteId } }).then(result =>
    user_game_history.destroy({ where: { user_game_id: req.body.deleteId } }).then(result =>
      user_game_biodata.destroy({ where: { user_game_id: req.body.deleteId } }).then(result =>
        res.send('user_game berhasil dihapus'))))
})

app.post('/users/create', (req, res) => {
  console.log(req.body.id)
  if (req.body.id === '') {

    user_games.create({
      username: req.body.username,
      password: req.body.password
    }).then(result =>

      user_game_biodata.create({
        user_game_id: result.id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email
      })
        .then(result => {
          res.send('user_game berhasil dibuat')
        })
    );
  } else {
    user_games.update({
      username: req.body.username
    }, { where: { id: req.body.id } }).then(result =>
      user_game_biodata.update({
        user_game_id: req.body.id,
        name: req.body.name,
        address: req.body.address,
        email: req.body.email
      }, { where: { user_game_id: req.body.id } })
        .then(result => {
          res.send('user_game berhasil diperbaharui')
        })
    );
  }
})

// // GET /articles/create, menampilkan form create
// app.get('/articles/create', (req, res) => {
// res.render('articles/create')
// })


app.get('/dashboard', (req, res) => {
  //  if(isLogin){ 
  user_game_biodata.findAll({
    include: [{ model: user_games }, {
      model: user_game_history
    }]
  }).
    then(biodata => {
      // res.json(biodata)
      res.render('dashboard', { biodata })
    })
  // user_game_biodata.findAll(
  //   {
  //   include: [
  //     {
  //       model: user_game_biodata,
  //       required: true
  //     }
  //   ]
  // }
  // )
  // .then(user_games => {

  //   //  res.json(usergame)
  //   res.render('dashboard', { user_games })
  // })

  // //  }else{
  //    res.redirect('/admin/login')
  //  }
})

app.get('/admin/login', (req, res) => {
  if (isLogin) {
    res.redirect('/dashboard')
  } else {
    res.render('admin/login')
  }
})


app.post('/admin/login', (req, res) => {
  const { username, password } = req.body
  for (var i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      isLogin = true
      user = users[i]
      break;
    }
  }

  if (isLogin) {
    res.render('dashboard')
  } else {
    res.redirect('/loginfailed')
  }
})
//#endregion

app.get('/greet', (req, res) => {
  const name = req.query.name || 'Void'
  res.render('greet', { name })
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const { username, email, password } = req.body
  users.push({ username, email, password })
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
  const { username, password } = req.body
  let fullname = ''
  for (var i = 0; i < users.length; i++) {
    if (username === users[i].username && password === users[i].password) {
      isLogin = true
      user = users[i]
      break;
    }
  }

  if (isLogin) {
    res.redirect('/loginsuccess?name=' + encodeURIComponent(user.fullname));
  } else {
    res.redirect('/loginfailed')
  }
})

app.get('/loginsuccess', (req, res) => {
  const name = req.query.name
  res.render('loginsuccess', { name })
})

app.get('/loginfailed', (req, res) => {
  res.render('loginfailed')
})

app.get('/api/v1/posts', (req, res) => {
  res.status(200).json(posts);
})

// POST /articles, buat artikel baru
app.post('/articles', (req, res) => {
  Article.create({
    title: req.body.title,
    body: req.body.body
  })
    .then(article => {
      res.send('Article berhasil dibuat')
    })
})

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(router)

//internal server error
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500).json({
    status: 'fail',
    error: err.message
  })
})

//404 handler
app.use(function (req, res) {
  res.status(404).json({
    status: 'fail',
    error: 'Are you lost?'
  })
})

