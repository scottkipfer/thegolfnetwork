'use strict';

var User = require('mongoose').model('User');
var passport = require('passport');

var getErrorMessage = function(err){
    var message = '';

    if(err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if(err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

exports.signup = function(req, res, next) {
    if(!req.user){
        var user = new User(req.body);
        var message = null;
        console.log(user);
        user.save(function(err) {
            if(err) {

                console.log(err);
                message = getErrorMessage(err);
                //req.flash('error', message);
                return res.redirect('#/signup');
            }

            req.login(user, function(err) {
                console.log(user);
                if(err){
                    console.log('LOGIN ERROR');
                    console.log(err);
                    return next(err);
                }
                return res.redirect('#/league-schedule');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signin = function(req, res) {
  if(req.isAuthenticated()){
      console.log('signed in');
      return res.redirect('/');
  } else {
      console.log('couldnt sign in');
  }
    res.redirect('#/signin');
};

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

exports.user = function(req,res,next,id){
    console.log(id);
    User.findOne({
        _id: id
    }).exec(function(err,user) {
        if(err){
            return next(err);
        }
        if(!user){
            return next(new Error('Failed to load user: ' +id));
        }
        user.hashed_password = null;
        user.salt = null;

        req.user = user;
        next();
    });
};

exports.me = function(req,res){
    res.json(req.user || null);
};

exports.authCallback = function(req,res){
    res.redirect('/');
};

