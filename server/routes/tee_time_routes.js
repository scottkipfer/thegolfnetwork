'use strict';

var tee_times = require('../controllers/tee_time.js');


module.exports = function(app) {

    app.route('/teetime')
        .get(tee_times.read)
        .post(tee_times.create);

    app.route('/teetime/:teetimeId')
        .get(tee_times.read)
        .put(tee_times.update)
        .delete(tee_times.delete);
    app.param('teetimeId', tee_times.tee_time);
};