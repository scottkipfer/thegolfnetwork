'use_strict'

module.exports = function(app){
    require('../routes/tee_time_routes.js')(app);
    require('../routes/league-round-routes.js')(app);
};
