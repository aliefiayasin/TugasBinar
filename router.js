// router.js
const router = require('express' ).Router()

// Controllers
const auth = require('./controllers/authController' )
const restrict = require('./middlewares/restrict')
const restrictjwt = require('./middlewares/restrict-jwt')


router.get('/', restrict, auth.index)
router.get('/whoami', restrict, auth.whoami)
router.get('/index', restrict, auth.index)
router.get('/game', restrict, (req, res) => res.render('game'))
router.get('/dashboard', restrict, auth.dashboard)

// Register Page
router.get('/register' , (req, res) => res.render('register' ))
router.post('/register' , auth.register )

// router.js
router.get('/login', (req, res) => res.render('login'))
router.post('/login', auth.login)

router.get('/create-room', restrict, (req, res) => res.render('create-room'))
router.post('/create-room', auth.createroom)
router.get('/room', restrict, (req, res) => res.render('game'))

// API

// get
router.get('/api/v1/auth/whoami', restrictjwt, auth.whoami)

// post
router.post('/api/v1/auth/register', auth.register_api)
router.post('/api/v1/auth/login', auth.login_api)
router.post('/api/v1/create-room', restrictjwt, auth.createroom)
router.post('/api/v1/fight/:id', restrictjwt, auth.fight)

module.exports = router;