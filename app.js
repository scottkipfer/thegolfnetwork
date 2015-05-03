// server.js

// modules
require('dotenv').load();
var http = require('http');
var express = require('express');
var app = express();
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');
var passport_config = require('./config/passport.js');
var session = require('express-session');
var jwt = require('express-jwt');
// email
var nodemailer = require('nodemailer');
var mailgun = require('nodemailer-mailgun-transport');
var mailauth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN_NAME
    }
}
var transporter = nodemailer.createTransport(mailgun(mailauth));

/*transporter.sendMail({
    from:'Test <no-reply@thenetworkgolf.com>',
    to:'scottkipfer@gmail.com',
    subject:'this is a test',
    html:'<b>Wow </b>',
    test: 'not so wow'
}, function(err,info){
    if(err) {
        console.log(err);
    } else {
        console.log('Response: ' + info);
    }
});*/

// Connect to the Database
require('./server/database/connect');

// Set up Auth
passport_config();

// Set the port
var port = process.env.PORT || 8080;
// Set the static directory
app.use(express.static(__dirname + '/public'));
app.use(morgan("dev"));
app.use(favicon(__dirname + '/public/img/thenetworkfav.png'));
app.use(bodyParser.json());
app.set('view engine','html');

//use passport
app.use(passport.initialize());
app.use(passport.session());

//use jwt
app.use(jwt({ secret: process.env.SECRET, requestProperty:'auth.token'}).unless({path: ['/','/signin','/signup']}));

var auth = require('./server/controllers/authorization.js');
require('./server/routes/routes.js')(app,auth);

// Handle all angular requests
app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html');
});

//Launch Server
app.listen(port);
console.log("listening on port: " + port);