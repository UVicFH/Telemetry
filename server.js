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

//for COM port testing
//var serialPort = new SerialPort("/dev/cu.usbmodem1421", {

//for telemetry use
var serialPort = new SerialPort("/dev/cu.SLAB_USBtoUART", {
    baudrate: 115200,
    parser: serialport.parsers.readline("\n")
}, false);

serialPort.open(function (error) {
  if ( error ) 
  {
    console.log(error);
  } 
  else
  {
    serialPort.on('open',function() 
    { 
      console.log('Port open'); 
    });
  }
});


serialPort.on('data', function(data) {
    var jsonData = {};
    jsonData = tools.processCanMessage(data);
    if (jsonData)
    {
      //console.log(jsonData)
      io.emit('canMessageHandlerUI', jsonData);
    }
});