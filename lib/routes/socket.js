var jwt    = require('jsonwebtoken');
var config = require('../config');

module.exports = function(io) {
  io.use(function(socket, next) {
    var token = socket.request._query.token;
    if (token) {
      jwt.verify(token, config.auth.jwtSecret, function(err, decoded) {
        socket.username = decoded.name;
        next();
      });
    } else {
      next(new Error());
    }
  });

  io.on('connection', function(socket) {
    socket.emit('joined', {message: 'You have Joined'});
    socket.on('message', function(data) {
      var date = new Date();
      socket.emit('message', {user: socket.username, data: data, date: date});
      socket.broadcast.emit('message', {
        user: socket.username,
        data: data,
        date: date
      });
    });
  });
};
