var mongoose = require('mongoose');
var dbURL = process.env.DB_URL;

mongoose.connect(dbURL);

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

require('../database/models/user_model.js');
require('../database/models/league_round_model.js');
require('../database/models/tee_time_model.js');
require('../database/models/course_model.js');
require('../database/models/tee_model.js');
require('../database/models/user_round_model.js');