var renderLoop;
(function($){
	$(document).ready(function (){
		console.log("main.js");
		setup();
		renderLoop = setInterval(update, 30);
		$(document).keydown(handleInput);
		$(document).keyup(handleInput);
	});
})(jQuery);

var red = d3.select("#red");
var blue = d3.select("#blue");

function setup() {
	red.x = 50;
	red.y = Math.floor(500*Math.random())+50;
	red.rot = 90;
	red.xv = 1;
	red.yv = 0;
	red.attr("transform","translate("+red.x+","+red.y+"),rotate("+red.rot+")");
	
	blue.x = 800-50;
	blue.y = Math.floor(500*Math.random())+50;
	blue.rot = -90;
	blue.xv = 0;
	blue.yv = 0;
	blue.attr("transform","translate("+blue.x+","+blue.y+"),rotate("+blue.rot+")");
}

function update() {
	checkKeys();
	
	
	if (red.xv*red.xv + red.yv*red.yv > 100){
		red.xv = 10*red.xv/Math.sqrt(red.xv*red.xv + red.yv*red.yv);
		red.yv = 10*red.yv/Math.sqrt(red.xv*red.xv + red.yv*red.yv);
	}
	red.x += red.xv;
	red.x = (red.x+800)%800;
	red.y += red.yv;
	red.y = (red.y+600)%600;
	d3.select('#red').attr("transform","translate("+red.x+","+red.y+"),rotate("+red.rot+")");
	d3.select('#blue').attr("transform","translate("+blue.x+","+blue.y+"),rotate("+blue.rot+")");
}

function redMove(action) {
	switch (action){
		case "thrust":
		red.xv += 0.5*Math.cos(Math.radians(red.rot-90));
		red.yv += 0.5*Math.sin(Math.radians(red.rot-90));
		break;
		case "fire":
		// fireMissile("red");
		break;
		case "turn right":
		red.rot = red.rot + 5;
		break;
		case "turn left":
		red.rot = red.rot - 5;
		break;
		case "hyperspace":
		break;
	}
}

var keystates = {};
function handleInput(event) {
	// console.log(event.which);
	// console.log(event.type);
	
	if (event.which == 27){
		clearInterval(renderLoop);
		renderLoop = false;
		return;
	} else if (event.which == 13){
		event.preventDefault();
		if (!renderLoop){ renderLoop = setInterval(update, 30); }
		return;
	}
	
	if (event.type == 'keydown'){ keystates[event.which] = true;  }
	if (event.type == 'keyup')  { keystates[event.which] = false; }
}

var keysOfInterest = [90,88,67,86,66, 78,77,188,190,191];
function checkKeys() {
	keysOfInterest.forEach(function(k){
		if (keystates[k]){
			switch (k){
				// RED
				case 90:
				redMove("turn left");
				break;
				case 88:
				redMove("turn right");
				break;
				case 67:
				redMove("hyperspace");
				break;
				case 86:
				redMove("thrust");
				break;
				case 66:
				redMove("fire");
				break;
				
				// BLUE
				case 78:
				break;
				case 77:
				break;
				case 188:
				break;
				case 190:
				break;
				case 191:
				break;
			}
		}
	});
}

Math.radians = function(degrees) {
	return degrees * Math.PI / 180;
};
Math.degrees = function(radians) {
	return radians * 180 / Math.PI;
};