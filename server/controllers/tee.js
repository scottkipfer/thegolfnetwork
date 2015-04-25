'use strict';

var mongoose = require('mongoose');
var Tee = mongoose.model('Tee');

exports.tee = function(req, res, next, id) {
    Tee.load(id, function(err, tee) {
        if(err) {
            return next(err);
        }
        if(!tee){
            return next(new Error('Failed to get tee ' + id ));
        }
        req.tee = tee;
        next();
    });
};

// Create Tee
exports.create = function(req, res) {
    var tee = new Tee(req.body);
    tee.save(function(err) {
        if(err) {
            return res.status(500).json({
                error: "Unable to create a new Tee"
            });
        }
        res.json(tee);
    });
};

// Read Tee
exports.read = function(req,res) {
    Tee.find().where('course').equals(req.course).sort('name').exec(function(err,tees) {
        if(err){
            return res.status(500).json({
                error: 'Unable to get tees'
            });
        }
        res.json(tees);
    });
};

// Show Tee
exports.show = function(req,res) {
    res.json(req.tee);
};

// Update Course
exports.update = function (req, res) {
    var tee = req.tee;

    tee.name = req.body.tee.name;
    tee.course = req.body.tee.course;
    tee.holes = req.body.tee.holes;
    tee.slope = req.body.tee.slope;
    tee.rating = req.body.tee.rating;

    tee.save(function(err) {
        if(err) {
            return res.status(500).json({
                error: 'Unable to update tee.'
            });
        }
        res.json(tee);
    });
};

// Delete Tee
exports.tee = function(req, res) {
    var tee = req.tee;

    tee.remove(function(err){
        if(err){
            return res.status(500).json({
                error: 'Unable to remove tee.'
            });
        }
        res.json(tee);
    });
};