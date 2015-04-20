'use strict';

var users = require('../controllers/user.js');
var passport = require('passport');

module.exports = function(app) {
    app.route('/signup')
        .post(users.signup);

    app.route('/signin')
        .post(passport.authenticate('local',{failureRedirect: '/signin1'}), function(req,res) {
            console.log(req.user);
            res.send({
                user:req.user
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
