// router.js
const router = require('express' ).Router()

// Controllers
const auth = require('./controllers/authController' )
const restrict = require('./middlewares/restrict')


router.get('/', restrict, auth.index)
router.get('/whoami', restrict, auth.whoami)
router.get('/index', restrict, auth.index)

// Register Page
router.get('/register' , (req, res) => res.render('register' ))
router.post('/register' , auth.register )
router.post('/api/v1/auth/register', auth.register)

// router.js
router.get('/login', (req, res) => res.render('login'))
router.post('/login', auth.login)
router.post('/api/v1/auth/login', auth.login)
router.get('/api/v1/auth/whoami', restrict, auth.whoami)

module.exports = router;