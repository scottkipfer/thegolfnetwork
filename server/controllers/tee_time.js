'use strict';

var mongoose = require('mongoose');
var TeeTime = mongoose.model.('TeeTime');
var _ = require('lodash');


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
  TeeTime.find().sort('time').exec(function(err,tee_times) {
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

    tee_time.time = req.body.time;
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