var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var db = require('../models');

passport.use(new localStrategy (
{
    usernameField: 'email'
},
    function(email, password, done) {
        db.User.findOne ({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: 'Please enter a valid email.'
                });
            }
            else if(!dbUser.validPassword(password)) {
                return done(bull, false, {
                    message: 'Your password is incorrect, please try again.'
                })
            }
            return done(null, dbUser);
        })
    }
))

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;