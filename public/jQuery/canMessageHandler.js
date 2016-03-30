$( document ).ready(function() {
	var startTime = new Date();

	var socket = io.connect('http://0.0.0.0:3000');

	var n = 40,
    random = d3.random.normal(0, .2),
    tempVtimeData = d3.range(200).map(random);

	var tempVtimemargin = {top: 20, right: 20, bottom: 20, left: 40},
	    width = 1200 - tempVtimemargin.left - tempVtimemargin.right,
	    height = 500 - tempVtimemargin.top - tempVtimemargin.bottom;

	var tempVtimeX = d3.scale.linear()
	    .domain([0, 200])
	    .range([0, width]);

	var tempVtimeY = d3.scale.linear()
	    .domain([-20, 120])
	    .range([height, 0]);

	var tempVtimeline = d3.svg.line()
	    .x(function(d, i) { return tempVtimeX(i); })
	    .y(function(d, i) { return tempVtimeY(d); });

	var tempVtimesvg = d3.select("#tempVtime").append("svg")
	    .attr("width", width + tempVtimemargin.left + tempVtimemargin.right)
	    .attr("height", height + tempVtimemargin.top + tempVtimemargin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + tempVtimemargin.left + "," + tempVtimemargin.top + ")");

	tempVtimesvg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  	.append("rect")
	    .attr("width", width)
	    .attr("height", height);

	tempVtimesvg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + tempVtimeY(0) + ")")
	    .call(d3.svg.axis().scale(tempVtimeX).orient("bottom"));

	tempVtimesvg.append("g")
	    .attr("class", "y axis")
	    .call(d3.svg.axis().scale(tempVtimeY).orient("left"));

	var tempVtimepath = tempVtimesvg.append("g")
	    .attr("clip-path", "url(#clip)")
	  	.append("path")
	    .datum(tempVtimeData)
	    .attr("class", "line")
	    .attr("d", tempVtimeline);

	var n = 40,
    random = d3.random.normal(0, .2),
    throttleVtimeData = d3.range(200).map(random);

	var throttleVtimemargin = {top: 20, right: 20, bottom: 20, left: 40},
	    width = 1200 - throttleVtimemargin.left - throttleVtimemargin.right,
	    height = 500 - throttleVtimemargin.top - throttleVtimemargin.bottom;

	var throttleVtimeX = d3.scale.linear()
	    .domain([0, 200])
	    .range([0, width]);

	var throttleVtimeY = d3.scale.linear()
	    .domain([0, 100])
	    .range([height, 0]);

	var throttleVtimeline = d3.svg.line()
	    .x(function(d, i) { return throttleVtimeX(i); })
	    .y(function(d, i) { return throttleVtimeY(d); });

	var throttleVtimesvg = d3.select("#throttleVtime").append("svg")
	    .attr("width", width + throttleVtimemargin.left + throttleVtimemargin.right)
	    .attr("height", height + throttleVtimemargin.top + throttleVtimemargin.bottom)
	  	.append("g")
	    .attr("transform", "translate(" + throttleVtimemargin.left + "," + throttleVtimemargin.top + ")");

	throttleVtimesvg.append("defs").append("clipPath")
	    .attr("id", "clip")
	  	.append("rect")
	    .attr("width", width)
	    .attr("height", height);

	throttleVtimesvg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + throttleVtimeY(0) + ")")
	    .call(d3.svg.axis().scale(throttleVtimeX).orient("bottom"));

	throttleVtimesvg.append("g")
	    .attr("class", "y axis")
	    .call(d3.svg.axis().scale(throttleVtimeY).orient("left"));

	var throttleVtimepath = throttleVtimesvg.append("g")
	    .attr("clip-path", "url(#clip)")
	  	.append("path")
	    .datum(throttleVtimeData)
	    .attr("class", "line")
	    .attr("d", throttleVtimeline);


 	socket.on('canMessageHandlerUI', function (data) {
    	console.log(data);
    	if (data.canId == 0x101)
    	{
    		var intermittentTime = new Date();
    		var timeDiff = intermittentTime - startTime;

    		$("#rpmVal").text(data.engineRpm);
    		$("#currentGear").text(data.currentGear);
			$("#speedVal").text(data.vehicleSpeed);

    	}
    	else if (data.canId == 0x102)
    	{
    		var temp = fahrenheitToCelsis(data.engineTemp);
    		$("#tempVal").text(temp);
    
		  	tempVtimeData.push(temp);
		  	// redraw the line, and slide it to the left
		  	tempVtimepath
		    	.attr("d", tempVtimeline)
		    	.attr("transform", null)
		      	.transition()
		      	.duration(500)
		      	.ease("linear")
		      	.attr("transform", "translate(" + tempVtimeX(-1) + ",0)")
		      	.each("end", tick);
		  	// pop the old data point off the front
		  	tempVtimeData.shift();
    		// Need to implement backend :3

    		$("#throttleVal").text(data.throttlePercent);

		  	throttleVtimeData.push(data.throttlePercent);
		  	// redraw the line, and slide it to the left
		  	throttleVtimepath
		      	.attr("d", throttleVtimeline)
		      	.attr("transform", null)
		    	.transition()
		      	.duration(500)
		      	.ease("linear")
		      	.attr("transform", "translate(" + throttleVtimeX(-1) + ",0)")
		      	.each("end", tick);
		  	// pop the old data point off the front
		  	throttleVtimeData.shift();
    	}
    	else if (data.canId == 0x200)
    	{
    		//Warning's not yet implemented
    	}
  	});

 	function fahrenheitToCelsis(pFahrenheit)
 	{
 		return ((pFahrenheit - 32 ) * (5/9)).toFixed(2);
 	}

 	function tick() {
 		// console.log("ay:");
		 //  // push a new data point onto the back
		 //  data.push(random());
		 //  // redraw the line, and slide it to the left
		 //  path
		 //      .attr("d", line)
		 //      .attr("transform", null)
		 //    .transition()
		 //      .duration(500)
		 //      .ease("linear")
		 //      .attr("transform", "translate(" + x(-1) + ",0)")
		 //      .each("end", tick);
		 //  // pop the old data point off the front
		 //  data.shift();
		}

	//var tmr = setInterval(tick, 2000);
});