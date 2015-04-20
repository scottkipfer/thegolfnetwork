'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalStrategy(function(email, password, done) {
        console.log('here' +email+' '+password);
        User.findOne({
            email: email
        }, function(err, user){
            console.log('user in auth: '+user);
            if(err) {
                return done(err);
            }
            if(!user){
                return done(null,false, {
                    message: 'Unknown User'
                });
            }
            if(!user.authenticate(password)) {
                return done(null,false, {
                        message: 'Invalid Password'
                });
            }
            return done(null,user);
        });
    }));
};