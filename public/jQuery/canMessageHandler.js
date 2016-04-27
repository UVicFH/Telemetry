$( document ).ready(function() {
	var startTime = new Date();
	var lastTime = Date.now();

	var socket = io.connect('http://0.0.0.0:3000');

 	socket.on('canMessageHandlerUI', function (data) {

		if(Date.now() - lastTime > 200) {
			console.log(data);
			lastTime = Date.now();

			if (data.canId == 0x101) {

				// RPM Dial
				rpmDial.load({
					columns: [['RPM', data.engineRpm]]
				});

				// Speed Dial
				speedDial.load({
					columns: [['Speed', data.vehicleSpeed]]
				});
				speedGraph.add(lastTime, data.vehicleSpeed)

				// Pack Voltage Dial
				voltDial.load({
					columns: [['Volt', data.essSoc]]
				});

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