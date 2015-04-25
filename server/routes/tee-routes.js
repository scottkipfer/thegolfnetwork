'use strict';
var tee = require('../controllers/tee.js');

module.exports = function(app) {
    app.route('/courses')
        .get( tee.read)
        .post(tee.create);

    app.route('/courses/:courseId')
        .get(tee.show)
        .put(tee.update)
        .delete(tee.delete);
    app.param('teeId', tee.tee);
};