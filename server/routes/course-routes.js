'use strict';
var course = require('../controllers/course.js');

module.exports = function(app) {
    app.route('/courses')
        .get( course.read)
        .post(course.create);

    app.route('/courses/:courseId')
        .get(course.show)
        .put(course.update)
        .delete(course.delete);
    app.param('courseId', course.course);
};