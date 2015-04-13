'use strict';

var mongoose = require('mongoose');
var LeagueRound = mongoose.model.('LeagueRound');
var TeeTime = mongoose.model.('TeeTime');

var createTeeTimes = function(league_round){
    var numberOfTeeTimes = 8;
    var minBetweenTeeTimes =10;
    var startingTeeTime = new Date(1988,6,28,17,15,0,0);

    for(i=0;i<numberOfTeeTimes;i++){
        var minToAdd = i * minBetweenTeeTimes;
        var TeeTime_Time = startingTeeTime.setMinutes(startingTeeTime.getMinutes() + minToAdd);

        var tee_time = new TeeTime({
            time: TeeTime_Time,
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


// Create League Round
exports.create = function (req,res) {
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
    TeeTime.find().exec(function(err,league_round) {
        if(err){
            return res.status(500).json({
                error: 'Cannot get tee times'
            })
        }
        res.json(league_round);
    });
};

// Update Tee Time
exports.update = function (req,res) {
    var league_round = req.league_round;

    league_round.name = req.body.league_round.name;

    tee_time.golfers = req.body.golfers;

    tee_time.save(function(err){
        if(err){
            return res.status(500).json({
                error: 'Cannot update tee time'
            });
        }
        res.json(tee_time);
    });
};

// Delete Tee Time
exports.delete = function (req, res){
    var tee_time = req.tee_time;

    tee_time.remove(function(err){
        if(err){
            return res.status(500).json({
                error: 'Cannot remove the tee time'
            });
        }
        res.json(tee_time);
    })
};