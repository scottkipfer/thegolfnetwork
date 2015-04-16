// server.js

// modules
require('dotenv').load();
var http = require('http');
var express = require('express');
var app = express();
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

// Connect to the Database
require('./server/database/connect');
// Set the port
var port = process.env.PORT || 8080;
// Set the static directory
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(favicon(__dirname + '/public/img/thenetworkfav.png'));
app.use(bodyParser.json());
app.set('view engine','html');


require('./server/routes/routes.js')(app);

// Handle all angular requests
app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html');
});

//Launch Server
app.listen(port);
console.log("listening on port: " + port);