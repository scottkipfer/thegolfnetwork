'use_strict'

module.exports = function(app,auth){
    require('../routes/tee_time_routes.js')(app);
    require('../routes/league-round-routes.js')(app,auth);
    require('../routes/user-routes.js')(app);
    require('../routes/course-routes.js')(app);
    require('../routes/tee-routes.js')(app);
};
