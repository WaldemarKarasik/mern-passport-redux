const {Router} = require('express')
const passport = require('passport')
const passportConfig = require('../passport')
const router = Router()
const User = require('../models/User')
const JWT = require('jsonwebtoken')
const serverError = require('../helpers/errors').serverError
const bcrypt = require('bcrypt')

const signToken = (userId) => {
    return JWT.sign({
        sub: userId,
        iss: 'komsomolradio'
    }, 'komsomolradio', {expiresIn: '1hr'})
}


router.post('/register', (req,res) => {
    const {username, password, role} = req.body
    User.findOne({username}, async (err, user) => {
        if(err) {
           return serverError(res)
        }
        if(user) {
            return res.status(403).json({message: {msgBody: "This username is already taken", msgError: true}})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username, password: hashedPassword, role})
        newUser.save((err, createdUser) => {
            if(err) {
                return serverError(res)
            }
            if(createdUser) {
                res.status(201).json({message: {msgBody: "User created", msgError: false}})
            }
        })
    })    
})

router.post('/login', passport.authenticate('local', {session: false}),(req,res) => {
    if(req.isAuthenticated()) {
        const {_id, username, role} = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, {httpOnly: true, sameSite: true})
        res.status(200).json({isAuthenticated: true, user: {username, role}})
    }
})

router.get('/logout', passport.authenticate('jwt', {session: false}), (req,res) => {
    res.clearCookie('access_token')
    return res.json({message: {msgBody: "Logged out", msgError: false}})
})

router.get('/isAuth', passport.authenticate('jwt', {session: false}), (req,res) => {
    if(req.isAuthenticated()) {
        return res.json(req.user)
    }
})

router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req,res) => {
    res.json({user: req.user})
})


module.exports = router