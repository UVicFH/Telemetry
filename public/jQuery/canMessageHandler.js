$( document ).ready(function() {
	var socket = io.connect('http://0.0.0.0:3000');
  socket.on('canMessageHandlerUI', function (data) {
    console.log(data);
    $("#rpmVal").text(data.engineRpm);
    $("#tempVal").text(data.engineTemp);
    $("#throttleVal").text(data.throttlePercent);
    //socket.emit('my other event', { my: 'data' });
  });
});