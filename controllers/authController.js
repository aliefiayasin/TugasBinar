// controllers/authController.js
const { User } = require('../models' )
const passport = require('../node_modules/passport' )

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken : user.generateToken()
    }
}

module.exports = {
    register : (req, res, next) => {
        // Kita panggil static method register yang sudah kita buat tadi
        User.register (req.body)
        .then(() => {
            res.redirect ('/login' )
        })
        .catch(err => next(err))
    },
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true // Untuk mengaktifkan express flash
    }),
    // login: (req, res) => {
    //     User.authenticate (req.body)
    //     .then(user => {
    //         res.json(
    //         format(user)
    //         )
    //     })
    // },
    whoami: (req, res) => {
        /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
        var isLogin = req.isAuthenticated();
        res.render('whoami', {user: req.user.dataValues})
    },
    index: (req, res) => {
        var isLogin = req.isAuthenticated();
        res.render('index', {isLogin : isLogin, user: req.user.dataValues})
    },
    
}