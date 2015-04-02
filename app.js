// server.js

// modules
var http = require('http');
var express = require('express');
var app = express();

// Set the port
var port = 8080;
// Set the static directory
app.use(express.static(__dirname + '/public'));


// Api Route to get game data from xboxapi.com
app.route('/api/xboxgames/:id').get(function (req, res) {
    var options = {
        host: 'catalog.xboxapi.com',
        path: '/' + req.params.id,
        port: 80
    }
    var request = http.get(options, function (response) {
        var body = "";
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            var json_body;
            try {
                json_body = JSON.parse(body);
            } catch(e){
                json_body =
                {'success':false,
                    'error':'Game Details Not Found...'};

            }
            res.jsonp(json_body);
        });
    });
    // unable to get data return an error.
    request.on('error', function (e) {
        console.log('Error ' + e.message);
    });

});

// Handle all angular requests
app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html');
});

//Launch Server
app.listen(port);