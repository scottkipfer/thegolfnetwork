'use strict';

module.exports = function(app){
    require('../routes/league-round-routes.js')(app);
    require('../routes/tee_time_routes.js')(app);
    require('../routes/user-routes.js')(app);
    require('../routes/course-routes.js')(app);
    require('../routes/tee-routes.js')(app);
    require('../routes/user-round-routes.js')(app);
};
