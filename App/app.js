'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = 1336;
app.set('port', (process.env.PORT || port));

app.use(express.static(path.join(__dirname, 'public/')));

// client route
app.get('/client', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/client/login.html'));
});

// driver route
app.get('/driver', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/driver/index.html'));
});

// dispatcher route
app.get('/dispatcher', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/dispatcher/index.html'));
});

var server = http.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});
