var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./lib/config');
var apiRoutes = require('./lib/routes/api.js');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 8000, process.env.IP || '127.0.0.1',
  function() {
    console.log('Server started');
  });

mongoose.connect(config.database.url);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', apiRoutes);

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

require('./lib/routes/socket.js')(io);
