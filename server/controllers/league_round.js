'use strict';

var mongoose = require('mongoose');
var LeagueRound = mongoose.model('LeagueRound');
var TeeTime = mongoose.model('TeeTime');

var createTeeTimes = function(league_round){
    var numberOfTeeTimes = 8;
    var minBetweenTeeTimes =10;
    var startingTeeTime = new Date(1988,6,28,17,5,0,0);
    var TeeTime_Time = startingTeeTime;
    var i;

    for(i=0;i<numberOfTeeTimes;i++){
        TeeTime_Time.setMinutes(startingTeeTime.getMinutes() + minBetweenTeeTimes);
        var tee_time = new TeeTime({
            time: new Date(TeeTime_Time),
            golfers:[],
            league_round: league_round._id
        });
        tee_time.save(function(err){
           if(err){
               return {
                   error: 'unable to create tee times'
               }
           }
        });
    }
};

exports.league_round = function(req, res, next, id){
    LeagueRound.load(id, function(err, league_round){
        if(err){
            return next(err);
        }
        if(!league_round){
            return next(new Error('Failed to get round ' + id));
        }
        req.league_round = league_round;
        next();
    });
};


// Create League Round
exports.create = function (req,res) {
    console.log(req.body);
    var league_round = new LeagueRound(req.body);
    league_round.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot create new League Round'
            });
        }

        createTeeTimes(league_round,function(err){
            if(err){
                return res.status(500).json({
                    error:'unable to create tee times'
                });
            }
        });
        res.json(league_round);

    });
};

// Read League Round
exports.read = function (req, res) {
    LeagueRound.find().sort('date').exec(function(err,league_round) {
        if(err){
            return res.status(500).json({
                error: 'Cannot get tee times'
            })
        }
        res.json(league_round);
    });
};

// Show League Round
exports.show = function(req,res) {
    res.json(req.league_round);
};

// Update Tee Time
exports.update = function (req,res) {
    var league_round = req.league_round;

    league_round.name = req.body.league_round.name;
    league_round.date = req.body.league_round.date;
    league_round.dont_care = req.body.league_round.dont_care;
    league_round.cant_make_it = req.body.league_round.cant_make_it;
    league_round.course = req.body.league_round.course;
    league_round.save(function(err){
        if(err){
            return res.status(500).json({
                error: 'Cannot update round'
            });
        }
        res.json(league_round);
    });
};

// Delete Tee Time
exports.delete = function (req, res){
    var league_round = req.league_round;

    league_round.remove(function(err){
        if(err){
            return res.status(500).json({
                error: 'Cannot remove the round'
            });
        }
        res.json(league_round);
    })
};