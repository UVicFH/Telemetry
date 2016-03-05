var express = require("express");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var app = express();
var router = express.Router();
var path = __dirname + '/views/';

var tools = require('./uvicLibrary/tools');
console.log(typeof tools.processCanMessage);


var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

router.get("/",function(req,res){
    res.sendFile(path + "UvicFHLanding.html");
});

app.use("/",router);

app.use("*",function(req,res){
    res.sendFile(path + "404.html");
});

server.listen(3000,function(){
    console.log("Live at Port 3000");
});

var interval = setInterval(function(str1, str2) {
    io.emit('canMessageHandlerUI', { hello: 'world' });
  console.log(str1 + " " + str2);
}, 1000, "Hello.", "How are you?");

io.on('connection', function (socket) {
  io.emit('canMessageHandlerUI', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

var serialPort = new SerialPort("/dev/ttyUSB0", {
    baudrate: 9600,
    parser: serialport.parsers.readline("\n")
});

serialPort.on('open',function() {
    console.log('Port open');
    serialPort.write("OMG IT WORKS\r");
});

serialPort.on('data', function(data) {
    var jsonData = {};
    jsonData = tools.processCanMessage(data);

    //console.log(jsonData);

    if (jsonData)
    {
        io.emit('canMessageHandlerUI', jsonData);
    }
});