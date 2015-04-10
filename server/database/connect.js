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