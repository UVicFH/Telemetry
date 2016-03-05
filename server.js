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

io.on('connection', function (socket) {
    // Might wanna do something better haha
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

    if (jsonData)
    {
        io.emit('canMessageHandlerUI', jsonData);
    }
});