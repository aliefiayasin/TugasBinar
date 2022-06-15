// controllers/authController.js
const { User, Room, RoomUserGame } = require('../models' )
const passport = require('../node_modules/passport' )
const { user_games, user_game_biodata, user_game_history } = require('../models')
// const room = require('../models/room')
// const roomusergame = require('../models/roomusergame')
var games = [];

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken : user.generateToken()
    }
}

function checkRoom(roomid){
    var roomForGame = Room.findOne({ where: { id: roomid } })
    if(roomForGame == null){
        return false;
    }else{
        return true;
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
    whoami: (req, res) => {
        /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
        res.render('whoami', {user: req.user.dataValues})
    },
    index: (req, res) => {
        var isLogin = req.isAuthenticated();
        res.render('index', {isLogin : isLogin, user: req.user.dataValues})
    },
    dashboard: (req, res) => {
        user_game_biodata.findAll({
            include: [{ model: user_games, required: true }, {
              model: user_game_history
            }]
          }).
            then(biodata => {
              res.render('dashboard', { biodata })
            })
    },
     createroom: (req, res) => {
        Room.createRoom(req.body)
        .then(room => {
            res.json("Room " + room.id + " is created successfully")
        }).catch(err =>  next(err))
    },
    register_api : (req, res, next) => {
        // Kita panggil static method register yang sudah kita buat tadi
        User.register(req.body)
        .then(() => {
            res.json("Register berhasil, silahkan login")
        })
        .catch(err =>  next(res.json("Periksa kembali data data login anda")))
    },
    login_api: (req, res) => {
        User.authenticate (req.body)
        .then(user => {
            res.json(format(user))
        })
    },
    fight: (req, res) => {
        if(req.isAuthenticated()){
            if(checkRoom(req.params.id)){
                if(req.body == "")
                    res.json("silahkan masukkan input")
                else{
                    if( games[req.params.id] == undefined)
                        games[req.params.id] = []
                    if( games[req.params.id][req.user.id] == undefined) 
                        games[req.params.id][req.user.id] = []
                    if(req.body.input == "R" || req.body.input == "P" || req.body.input == "S"){
                        res.json(JSON.stringify(games))
                        if(games[req.params.id][req.user.id].length <= 3){
                            games[req.params.id][req.user.id].push(req.body.input)
                        }
                        else{
                            res.json("silahkan menunggu hasil :" + JSON.stringify(games))
                        }
                    }else{
                        res.json(req.body.input + " masukkan nilai P untuk Paper atau R untuk Rock atau S untuk Scissor...")
                    }
                }
            }
        }else{            
            res.json("silahkan login")
        }
    },
    
}