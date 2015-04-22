'use strict';

var league_round = require('../controllers/league_round.js');

module.exports = function(app,auth) {
    app.route('/league-round')
        .get( league_round.read)
        .post(league_round.create);

    app.route('/league-round/:leagueroundId')
        .get(league_round.show)
        .put(league_round.update)
        .delete(league_round.delete);
    app.param('leagueroundId', league_round.league_round);
};