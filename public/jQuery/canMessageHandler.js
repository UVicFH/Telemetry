$( document ).ready(function() {
	var startTime = new Date();
	var lastTime = Date.now();
    var graphLength = 50;

	var socket = io.connect('http://0.0.0.0:3000');

 	socket.on('canMessageHandlerUI', function (data) {

		if(Date.now() - lastTime > 100) {
			console.log(data);
			lastTime = Date.now();

			if (data.canId == 0x101) {

				// RPM Dial
				rpmDial.load({
					columns: [['RPM', data.engineRpm]]
				});
                rpmGraphData.push(data.engineRpm);
                if (rpmGraphData.length > graphLength) {
                    rpmGraphData.shift();
                }
                rpmGraphData.unshift('RPM');
                rpmGraph.load({
                    columns: [
                        rpmGraphData
                    ]
                });
                rpmGraphData.shift();


				// Speed Dial
				speedDial.load({
					columns: [['Speed', data.vehicleSpeed]]
				});
                speedGraphData.push(data.vehicleSpeed);
                if (speedGraphData.length > graphLength) {
                    speedGraphData.shift();
                }
                speedGraphData.unshift('Speed');
                speedGraph.load({
                    columns: [
                        speedGraphData
                    ]
                });
                speedGraphData.shift();

				// Pack Voltage Dial
				voltDial.load({
					columns: [['Volt', data.essSoc]]
				});
                voltGraphData.push(data.essSoc);
                if (voltGraphData.length > graphLength) {
                    voltGraphData.shift();
                }
                voltGraphData.unshift('Volt');
                voltGraph.load({
                    columns: [
                        voltGraphData
                    ]
                });
                voltGraphData.shift();

				// Gear Dial
				gearDial.load({
					columns: [['Gear', data.currentGear]]
				});

			}
			else if (data.canId == 0x102) {
				// Temp Dial
				tempDial.load({
					columns: [['Temp', data.engineTemp]]
				});
				// tempVtimeData.push(data.engineTemp);

				// Throttle Dial
				throttleDial.load({
					columns: [['Throttle', data.throttlePercent]]
				});
			}
			else if (data.canId == 0x200) {
				//Warnings not yet implemented
			}
		}
  	});

	// unused now - MABX reports in Fahrenheit
 	function fahrenheitToCelsis(pFahrenheit)
 	{
 		return ((pFahrenheit - 32 ) * (5/9)).toFixed(2);
 	}
});