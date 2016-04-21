// Marije Dekker
/* use this to test out your function */
window.onload = function() {
 	changeColor('port', '#BDFCC9');
 	changeColor('hro', '#860A26');
 	changeColor('fin', '#F235B5');
 	changeColor('pl', '#3A13B5');
}

/* changeColor takes a path ID and a color (hex value)
   and changes that path's fill color */
function changeColor(id, color) {
    var A = document.getElementById(id)
    A.setAttribute("fill", color);
}