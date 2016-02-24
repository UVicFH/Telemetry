var express = require("express");
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var app = express();
var router = express.Router();
var path = __dirname + '/views/';

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

app.listen(3000,function(){
  console.log("Live at Port 3000");
});

var serialPort = new SerialPort("/dev/ttys013", {
  baudrate: 9600,
  parser: serialport.parsers.raw
});

serialPort.on('open',function() {
  console.log('Port open');
  serialPort.write("OMG IT WORKS\r");
});

serialPort.on('data', function(data) {
	console.log("Data recieved!")
    console.log(data);
});