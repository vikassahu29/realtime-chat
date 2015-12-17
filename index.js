var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 8000, process.env.IP || '127.0.0.1',
  function() {
    console.log('Server started');
  });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {

  socket.emit('joined', {message: 'You have Joined'});

  socket.on('message', function(data) {
    socket.emit('message', data);
    socket.broadcast.emit('message', data);
  });

});
