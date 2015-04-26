'use strict';

var mongoose = require('mongoose');
var Course = mongoose.model('Course');

exports.course = function(req, res, next, id) {
    Course.load(id, function(err, course) {
        if(err) {
            return next(err);
        }
        if(!course){
            return next(new Error('Failed to get course ' + id));
        }
        req.course = course;
        next();
    });
};

// Create Course
exports.create = function(req, res) {
    var course = new Course(req.body);
    course.save(function(err) {
        if(err) {
            return res.status(500).json({
                error: "Cannot Create a new Course"
            });
        }
        res.json(course);
    });
};

// Read Courses
exports.read = function (req, res) {
    Course.find().sort('name').exec(function(err,courses){
        if(err){
            return res.status(500).json({
                error: 'Cannot get Courses'
            })
        }
        res.json(courses);
    });
};

//Show Course
exports.show = function(req,res) {
    res.json(req.course);
};

// Update Course
exports.update = function (req,res) {
    var course = req.course;

    course.name = req.body.course.name;
    course.address = req.body.course.address;
    course.city = req.body.course.city;
    course.zipcode = req.body.course.zipcode;
    course.tees = req.body.course.tees;

    course.save(function(err) {
        if(err){
            return res.status(500).json({
                error: 'Cannot Update Course'
            });
        }
        res.json(course);
    });
};

// Delete Course
exports.delete = function(req, res){
    var course = req.course;

    course.remove(function(err){
        if(err){
            return res.status(500).json({
                error: 'unable to remove course'
            });
        }
        res.json(course);
    });
};


