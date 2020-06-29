const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')


const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies['access_token']
    }
    return token
}

passport.use(new JwtStrategy({
    secretOrKey: 'komsomolradio',
    jwtFromRequest: cookieExtractor
}, (payload, done) => {
    User.findOne({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err)
        }
        if(!user) {
            return done(null, false)
        }
        return done(null, user)
    })
}))

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        if(err) {
            return done(err)
            
        }
        if(!user) {
            
            return done(null, false, {message: "User with this username does not exist"})
            
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return done(err)
            }
            if(!isMatch) {
                return done(null, false, {message: "Incorrect password"})
            }
            return done(null, user)
        })
    })
}))