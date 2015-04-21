'use strict';

var users = require('../controllers/user.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.route('/signup')
        .post(users.signup);

    app.route('/signin')
        .post(passport.authenticate('local',{failureRedirect: '/signin'}), function(req,res) {
            //todo send jwt here
            var secret = process.env.SECRET;
            console.log(secret);
            req.user.salt = "";
            req.user.hashed_password="";
            var token = jwt.sign({user:req.user},secret, {expiresInMinutes:10});
            res.send({
                token:token
            });
        });

    app.route('/signout')
        .get(users.signout);

    app.route('/users/me')
        .get(users.me);

    app.param('userId',users.user);

    app.route('/loggedin')
        .get(function(req,res) {
            res.send(req.isAuthenticated() ? req.user: '0');
        });
};
