'use strict';

var users = require('../controllers/user.js');
var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function(app) {
    app.route('/signup')
        .post(users.signup);

    app.route('/signin')
        .post(passport.authenticate('local',{failureRedirect: '/signin'}), function(req,res) {
            var secret = process.env.SECRET;
            var token_time = process.env.TOKEN_EXPIRE_TIME;
            req.user.salt = "";
            req.user.hashed_password="";
            var token = jwt.sign({user:req.user}, secret, {expiresInMinutes:token_time});
            res.send({
                token:token
            });
        });

    app.route('/signout')
        .get(users.signout);

    app.route('/users/me')
        .get(users.me);

    app.param('userId',users.user);
};
