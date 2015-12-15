var socket = io.connect('/');
socket.on('joined', function (data) {
  console.log(data);
});