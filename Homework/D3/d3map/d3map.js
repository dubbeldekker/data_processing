// Marije Dekker
// 10785949

// get the data
var rawdata = d3.json("worldpopulation.json", function(rawdata){
	// sort data
	var i = 0
	var country = [];
	var population = [];
	var tempList = [];
	for(var i = 0 in rawdata){
		tempList = rawdata[i];
		country[i] = tempList[0];
		population[i] = tempList[1];
	}
	var map = new Datamap({
		element: document.getElementById('container'),
		fills: {
	            ONE: '#FFF5EB',
	            TWO: '#FEE6CE',
	            THREE: '#FDD092',
	            FOUR: '#FDAE6B',
	            FIVE: '#FD8D3C',
	            SIX: '#F16913',
	            SEVEN: '#D94801',
	            EIGHT: '#8C2D04',
	            defaultFill: 'black'
	        }
	});
	var templand;
	for(i in population){
	    if (population[i] > 1000000000){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'EIGHT'}
	    	});
	    }
	    if ((population[i] > 100000000) && (population[i] < 999999999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'SEVEN'}
	    	});
	    }
	    if ((population[i] > 50000000) && (population[i] < 99999999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'SIX'}
	    	});
	    }
	    if ((population[i] > 10000000) && (population[i] < 49999999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'FIVE'}
	    	});
	    }
	    if ((population[i] > 1000000) && (population[i] < 9999999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'FOUR'}
	    	});
	    }
	    if ((population[i] > 100000) && (population[i] < 999999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'THREE'}
	    	});
	    }
	    if ((population[i] > 10000) && (population[i] < 99999)){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'TWO'}
	    	});
	    }
	    if (population[i] < 9999){ 
	    	templand = country[i];
	    	map.updateChoropleth({
	    		templand: {fillKey: 'ONE'}
	    	});
	    }
	}	
});