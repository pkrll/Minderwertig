const path = require('path');

module.exports = function (app) {

  app.get('/client', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/client/index.html'));
  });

  app.get('/client/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/client/index.html'));
  });

  // driver route
  app.get('/driver', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/driver/index.html'));
  });

  app.get('/driver/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/driver/index.html'));
  });

  // dispatcher route
  app.get('/dispatcher', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/dispatcher/index.html'));
  });

  app.get('/dispatcher/*', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../views/dispatcher/index.html'));
  });

};
