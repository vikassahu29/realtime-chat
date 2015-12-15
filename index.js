var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT, process.env.IP, function() {
  console.log('Server started');
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  socket.emit('joined', {message: 'New User Joined'});
  socket.on('message', function(data) {
    console.log(data);
  });
});
