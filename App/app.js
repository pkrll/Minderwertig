'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = 1336;
app.set('port', (process.env.PORT || port));

app.use(express.static(path.join(__dirname, 'public/')));
// Serve vue from node_modules as vue/
app.use('/vue', express.static(path.join(__dirname, '/node_modules/vue/dist/')));
app.use('/vue-router', express.static(path.join(__dirname, '/node_modules/vue-router/dist/')));

// app.get('/', function (req,res) {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// client route
app.get('/client', function (req, res) {
    res.sendFile(path.join(__dirname, 'views/client/index.html'));
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
