'use strict';

var mongoose = require('mongoose');
var TeeTime = mongoose.model('TeeTime');

exports.tee_time = function(req, res, next, id){
    TeeTime.load(id, function(err, tee_time){
        if(err){
            return next(err);
        }
        if(!tee_time){
            return next(new Error('Failed to get team time ' + id));
        }
        req.tee_time = tee_time;
        next();
    });
};

// Create Tee Time
exports.create = function (req,res) {
    var tee_time = new TeeTime(req.body);

    tee_time.save(function(err) {
        if (err) {
            return res.status(500).json({
                error: 'Cannot create tee time'
            });
        }
        res.json(tee_time);

    });
};

// Read Tee Times
exports.read = function (req, res) {
  TeeTime.find().where('league_round').equals(req.league_round._id).sort('time').exec(function(err,tee_times) {
      if(err){
          return res.status(500).json({
              error: 'Cannot get tee times'
          })
      }
      res.json(tee_times);
  });
};

// Update Tee Time
exports.update = function (req,res) {
    var tee_time = req.tee_time;
    var isFull = true;
    var isRemoving = false;
    req.body.golfers.forEach(function(golfer){
        if (golfer.name === 'empty' && isFull === true) {
            isRemoving = true;
        }
    });
    tee_time.golfers.forEach(function (golfer) {
        if (golfer.name === 'empty' && isFull === true) {
            isFull = false;
        }
    });
    if (isFull && !isRemoving) {
        return res.status(500).json({
            error: 'Tee Time is full'
        });
    } else {
        tee_time.time = req.body.time;
        tee_time.golfers = req.body.golfers;

        tee_time.save(function (err) {
            if (err) {
                return res.status(500).json({
                    error: 'Cannot update tee time'
                });
            }
            res.json(tee_time);
        });
    }
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