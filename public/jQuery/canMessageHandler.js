$( document ).ready(function() {
	var date = new Date();

	var rpmArray = [0];
	var rpmTimeArray = [date.getSeconds()]

	var speedArray = [0];
	var speedTimeArray = [date.getSeconds()]

	var tempArray = [0];
	var tempTimeArray = [date.getSeconds()]


	var socket = io.connect('http://0.0.0.0:3000');

	SPEEDVTIME = document.getElementById('speedVtime');

	Plotly.plot( SPEEDVTIME, [{
		x: speedTimeArray,
		y: speedArray }], {
	margin: { t: 0 } } );

	RPMVTIME = document.getElementById('rpmVtime');
	Plotly.plot( RPMVTIME, [{
		x: rpmTimeArray,
		y: rpmArray }], {
	margin: { t: 0 } } );

	TEMPVTIME = document.getElementById('tempVtime');
	Plotly.plot( TEMPVTIME, [{
		x: tempTimeArray,
		y: tempArray }], {
	margin: { t: 0 } } );

 	socket.on('canMessageHandlerUI', function (data) {
    	console.log(data);
    	if (data.canId == 0x100)
    	{
    		$("#rpmVal").text(data.engineRpm);
    		rpmArray.push(data.engineRpm);
    		rpmTimeArray.push(date.getSeconds());

   //  		Plotly.plot( RPMVTIME, [{
			// 	x: rpmTimeArray,
			// 	y: rpmArray }], {
			// margin: { t: 0 } } );

    		$("#tempVal").text(data.engineTemp);
    		tempArray.push(data.engineTemp);
    		tempTimeArray.push(date.getSeconds());

   //  		Plotly.plot( TEMPVTIME, [{
			// 	x: tempTimeArray,
			// 	y: tempArray }], {
			// margin: { t: 0 } } );

    		$("#throttleVal").text(data.throttlePercent);


    	}
    	else if (data.canId == 0x200)
    	{
    		// Need to implement backend :3
    	}
    	else if (data.canId == 0x300)
    	{

    	}
    	else if (data.canId == 0x400)
    	{
    		$("#currentGear").text(data.currentGear);
			$("#speedVal").text(data.vehicleSpeed);
			speedArray.push(data.vehicleSpeed);
			speedTimeArray.push(date.getSeconds());

			// Plotly.plot( SPEEDVTIME, [{
			// 	title: 'Speed Vs Time',
			// 	x: speedTimeArray,
			// 	y: speedArray }], {
			// margin: { t: 0 } } );
    	}
  });
});