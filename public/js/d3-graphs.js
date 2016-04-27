var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var testLineData = [{ "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                    { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                    { "x": 80,  "y": 5},  { "x": 100, "y": 60}];

var formatDate = d3.time.format("%d-%b-%y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .interpolate("linear");

var graph = function(name) {
    var svg = d3.select("#" + name).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("path")
        .attr("d", line(testLineData))//{"x":Date.now(), "y":y}))
        .attr("stroke", "blue")
        .attr("stroke-width", 2)
        .attr("fill", "none");

    this.push = function() {
        svg.append("path")
            .attr("d", line(testLineData))//{"x":Date.now(), "y":y}))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none");
    }
}


//
// function type(d) {
//     d.date = formatDate.parse(d.date);
//     d.close = +d.close;
//     return d;
// }

var speedGraph = new graph("speedGraph");

setInterval(speedGraph.push(), 2000);

// svg.push(random());
//
// // redraw the line, and then slide it to the left
// path
//     .attr("d", line)
//     .attr("transform", null)
//     .transition()
//     .attr("transform", "translate(" + x(-1) + ")");
