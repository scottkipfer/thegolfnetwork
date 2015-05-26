'use strict';

var user_round = require('../controllers/user_round.js');

module.exports = function(app) {
    app.route('/user-round')
        .get(user_round.read)
        .post(user_round.create);

    app.route('/user-round/:userroundId')
        .get(user_round.show)
        .put(user_round.update)
        .delete(user_round.delete);

    app.param('userroundId', user_round.user_round);
};