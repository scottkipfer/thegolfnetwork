'use strict';
var tee = require('../controllers/tee.js');

module.exports = function(app) {
    app.route('/tees')
        .post(tee.create);

    app.route('/tees/:courseId')
        .get(tee.read)
        .put(tee.update)
        .delete(tee.delete);
    app.param('teeId', tee.tee);
};