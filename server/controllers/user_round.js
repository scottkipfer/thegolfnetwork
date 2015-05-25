'use strict';

var mongoose = require('mongoose');
var UserRound = mongoose.model('UserRound');
var Tee = mongoose.model('Tee');
var _ = require('lodash');

exports.user_round = function(req, res, next, id) {
    UserRound.load(id, function(err, user_round){
        if(err){
            return next(err);
        }
        if(!user_round){
            return next(new Error('Failed to get round ' + id));
        }
        req.user_round = user_round;
        next();
    });
};

exports.create = function (req, res) {
    // todo create protection against other users creating rounds!
    var user_round = new UserRound(req.body);
    user_round.save(function(err) {
        if(err) {
            return res.status(500).json({
                error: 'Cannot create new User Round'
            });
        }
        console.log('Created a new User Round!');
        res.json(user_round);
    });
};

exports.show = function(req,res) {
    res.json(req.user_round);
};

exports.read_by_user = function(req,res){
    UserRound.find().where('golfer').equals(req.user_id).sort('date',-1).exec(function(err, rounds){
        if(err) {
            return res.status(500).json({
                error: 'Cannot get user rounds'
            });
        }
        res.json(user_rounds);
    });
};

exports.read_by_league_round = function(req,res){
    UserRound.find().where('league_round').equals(req.league_round).sort('date',-1).exec(function(err, rounds){
        if(err) {
            return res.status(500).json({
                error: 'Cannot get user rounds'
            });
        }
        res.json(user_rounds);
    });
};

exports.read = function(req, res){
    UserRound.find().sort('date',-1).limit(100).exec(function(err, rounds){
        if(err) {
            return res.status(500).json({
                error: 'Cannot get user rounds'
            });
        }
        res.json(user_rounds);
    });
};

exports.update = function(req, res) {
    // todo create protection against other users updating rounds!
    var user_round = req.user_round;
    user_round = _.extend(user_round, req.body);

    user_round.save(function(err) {
        if(err) {
            return res.status(500).json({
                error: 'Unable to update user round'
            });
        }
        console.log('User Round ' + user_round._id + ' Updated Successfully!');
        res.json(user_round);
    })
};

exports.delete = function (req, res) {
    //todo add protection against other users deleting rounds!
    var user_round = req.user_round;

    user_round.remove(function(err){
        if(err){
            return res.status(500).json({
                error: 'Canot remove the user round'
            });
        }
        console.log('Removed User Round: '+ user_round._id);
        res.json(user_round);
    })
};