// Marije Dekker, 10785949
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse,
    bisectDate = d3.bisector(function(d) { return d.date; }).left;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.temperature/10); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//On click, update with new data			
d3.selectAll(".year")
  .on("click", function() {
	var datum = this.getAttribute("value");
	var str;
	if(datum == "2010"){
		str = "d3lineExtended2010.json";
	}
	if(datum == "2011"){
		str = "d3lineExtended2011.json";
	}
	if(datum == "2012"){
		str = "d3lineExtended2012.json";
	}
	if(datum == "2013"){
		str = "d3lineExtended2013.json";
	}
	if(datum == "2014"){
		str = "d3lineExtended2014.json";
	}
	if(datum == "2015"){
		str = "d3lineExtended2015.json";
	}
	/*else{
		str = "d3lineExtended.json";
	}*/

	d3.json(str, function(data){
		color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

		data.forEach(function(d){
			d.date = parseDate(d.date);
		});
		
		var sort = color.domain().map(function(name) {
	    return {
		    name: name,
		    values: data.map(function(d) {
		        return {date: d.date, temperature: +d[name]};
		      	})
		    };
		});

		x.domain(d3.extent(data, function(d) { return d.date; }));
	  	y.domain([
		    d3.min(sort, function(c) { return d3.min(c.values, function(v) { return v.temperature/10; }); }),
		    d3.max(sort, function(c) { return d3.max(c.values, function(v) { return v.temperature/10; }); })
		]);

		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis)
		  .append("text")
		  	.attr("text-anchor", "end")
		  	.attr("dx", "28.5em")
		  	.attr("dy", "2em")
		  	.text("datum");

		svg.append("g")
		    .attr("class", "y axis")
		    .call(yAxis)
		  .append("text")
		    .attr("transform", "rotate(90)")
		    .attr("y", 6)
		    .attr("dy", "2em")
		    .attr("dx", "20em")
		    .style("text-anchor", "end")
		    .text("temperatuur");

		var sorts = svg.selectAll(".sorts")
		    .data(sort)
		  .enter().append("g")
		    .attr("class", "sorts");

		sorts.append("path")
		    .attr("class", "line")
		    .attr("d", function(d) { return line(d.values); })
		    .style("stroke", function(d) { return color(d.name); });
		
		var focus = svg.append("g")
	      .attr("class", "focus")
	      .style("display", "none");

		focus.append("circle")
		    .attr("r", 4.5);

		focus.append("text")
	      .attr("x", 9)
	      .attr("dy", ".35em");

	    svg.append("rect")
	      .attr("class", "overlay")
	      .attr("width", width)
	      .attr("height", height)
	      .on("mouseover", function() { focus.style("display", null); })
	      .on("mouseout", function() { focus.style("display", "none"); })
	      .on("mousemove", mousemove);

	    function mousemove() {
		    var x0 = x.invert(d3.mouse(this)[0]),
		        i = bisectDate(data, x0, 1),
		        d0 = data[i - 1],
		        d1 = data[i],
		        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
		    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.gemTemp/10) + ")");
		    focus.select("text").text(d.gemTemp/10);
	    }
	});
});