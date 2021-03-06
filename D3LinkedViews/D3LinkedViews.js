// Marije Dekker
//initiate worldmap
var map = new Datamap({
		element: document.getElementById('container'),
		fills: {
      Q1: '#1A9641',
      Q2: '#A6D96A',
      Q3: '#FDAE61',
      Q4: '#D7191C',
      over: '#0000FF',
      defaultFill: '#000000'
    },
    geographyConfig: {
      popupTemplate: function(geo, data) {
        return ['<div class="hoverinfo">',
          'The quality of life index of ' + geo.properties.name,
          ' is ' + data.QUALITY,
          '</div>'].join('');
      } 
    }
});

var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
 .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dynamicColor;

d3.json("data.json", function(error, data) {
  if(error) throw error;
  // update worldmap
  for(i in data){
    var fillkey = {};
    var update = {};
    fillkey["QUALITY"] = data[i].qualityOfLife;
    update[data[i].countrycode] = fillkey;
    map.updateChoropleth(update);
    if(data[i].qualityOfLife >= 200){
      var fillKey = {};
      fillKey["fillKey"] = "Q1";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if((data[i].qualityOfLife <= 199.99) && (data[i].qualityOfLife >= 150)){
      var fillKey = {};
      fillKey["fillKey"] = "Q2";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if((data[i].qualityOfLife <= 149.99) && (data[i].qualityOfLife >= 100)){
      var fillKey = {};
      fillKey["fillKey"] = "Q3";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if(data[i].qualityOfLife < 99.99){
      var fillKey = {};
      fillKey["fillKey"] = "Q4";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
  }
  // make barchart
  var colors = d3.scale.linear()
    .domain([0, data.length * .33, data.length * .66, data.length])
    .range(['#1A9641', '#A6D96A', '#FDAE61', '#D7191C'])
  x.domain(data.map(function(d) { return d.country; }));
  y.domain([0, d3.max(data, function(d) { return d.qualityOfLife; })]);

  chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
   .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(80)")
    .style("text-anchor", "start");

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(90)")
      .attr("y", 6)
      .attr("dx", "34em")
      .style("text-anchor", "end")
      .text("quality of life index");

  chart.selectAll(".bar")
    .data(data)
   .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.country); })
    .attr("y", function(d) { return y(d.qualityOfLife); })
    .attr("height", function(d) { return height - y(d.qualityOfLife); })
    .attr("width", x.rangeBand())
    .style({
      'fill': function (data, i) {
        return colors(i);
      }
    })
    .on('mouseover', function (data) {
      dynamicColor = this.style.fill
      d3.select(this)
        .style('fill', '#0000FF')
      var fillKey = {}
      var update = {}
      fillKey["fillKey"] = "over"
      update[data.countrycode] = fillKey
      map.updateChoropleth(update)
      document.getElementById("country").innerHTML = "facts about: " + data.country
      document.getElementById("quality").innerHTML = "the quality of life index is " + data.qualityOfLife     
      document.getElementById("power").innerHTML = "the purchasing power index is " + data.purchasingPower
      document.getElementById("safety").innerHTML ="the safety index is " + data.safety
      document.getElementById("healthcare").innerHTML = "the healthcare index is " + data.healthCare
      document.getElementById("livingcost").innerHTML = "the cost of living index is " + data.costOfLiving 
      document.getElementById("property").innerHTML = "the property price to income ratio is " + data.propertyPriceIncome
      document.getElementById("traffic").innerHTML = "the traffic commute time index is " + data.trafficCommuteTime
      document.getElementById("pollution").innerHTML = "the pollution index is " + data.pollution
      document.getElementById("climate").innerHTML = "the climate index is " + data.climate
    })
    .on('mouseout', function (data) {
      d3.select(this)
        .style('fill', dynamicColor)
      if(data.qualityOfLife >= 200){
        var fillKey = {};
        fillKey["fillKey"] = "Q1";
        update[data.countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if((data.qualityOfLife <= 199.99) && (data.qualityOfLife >= 150)){
        var fillKey = {};
        fillKey["fillKey"] = "Q2";
        update[data.countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if((data.qualityOfLife <= 149.99) && (data.qualityOfLife >= 100)){
        var fillKey = {};
        fillKey["fillKey"] = "Q3";
        update[data.countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if(data.qualityOfLife < 99.99){
        var fillKey = {};
        fillKey["fillKey"] = "Q4";
        update[data.countrycode] = fillKey;
        map.updateChoropleth(update);
      }
    })
});