$(document).ready(function() {
	var xAxisData = [1, 2, 3, 4, 5];
	var counter = 6;
	var yAxisData = [1, 2, 4, 8, 16];

	TESTER = document.getElementById('tester');
	Plotly.plot( TESTER, [{
	x: xAxisData,
	y: yAxisData }], {
	margin: { t: 0 } } );

	TESTER1 = document.getElementById('tester1');
	Plotly.plot( TESTER1, [{
	x: xAxisData,
	y: yAxisData }], {
	margin: { t: 0 } } );



	setInterval(function() {
		xAxisData.push(counter);
		yAxisData.push(5);
		counter = counter + 1;
		Plotly.newPlot( TESTER, [{
			x: xAxisData,
			y: yAxisData }], {
			margin: { t: 0 } } );

  }, 3000);
});


