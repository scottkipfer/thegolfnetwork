'use strict';

var tee_times = require('../controllers/tee_time.js');


module.exports = function(app) {

    app.route('/teetime')
        .post(tee_times.create);

    app.route('/teetime-byleague/:leagueroundId')
        .get(tee_times.read);

    app.route('/teetime-bytee/:teetimeId')
        .put(tee_times.update)
        .delete(tee_times.delete);

    app.param('teetimeId', tee_times.tee_time);
};