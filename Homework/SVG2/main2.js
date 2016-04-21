// Marije Dekker
/* use this to test out your function */
window.onload = function() {
	var object = [];
	object = JSON.parse(document.getElementById("data").value);
	for(i = 0; i < 28; i++){
		var z = []
		z = object[i];
		var country = z[0];
		if (z[1] < 76){
			changeColor(country, '#FFFFD4');
		}
		if ((z[1] > 75) && (z[1] < 151)){
			changeColor(country, '#FEE391');
		}
		if ((z[1] > 150) && (z[1] < 226)){
			changeColor(country, '#FEC44F');
		}
		if ((z[1] > 225) && (z[1] < 301) ){
			changeColor(country, '#FEC44F');
		}
		if ((z[1] > 300) && (z[1] < 376)){
			changeColor(country, '#EC7014');
		}
		if ((z[1] > 375) && (z[1] < 451)){
			changeColor(country, '#CC4C02');
		}
		if (z[1] > 450){
			changeColor(country, '#8C2D04');
		}
	}
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    var a = document.getElementById(id);
    a.setAttribute("fill", color);
}