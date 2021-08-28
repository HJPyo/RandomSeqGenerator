'use strict'

const field = document.querySelector('#field');
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');
ctx.canvas.width = field.offsetWidth;
ctx.canvas.height = field.offsetHeight;

class cannonBall {
	constructor() {
		this.x = myCanvas.width / 2;
		this.y = myCanvas.height / 2;
		this.scale = 30;
	}
	draw() {
		var radius = myCanvas.width / this.scale;
		var gx = this.x - radius;
		var gy = this.y - radius;
		var gradient = ctx.createRadialGradient(gx, gy, radius / 2, this.x, this.y, radius * 2);
		gradient.addColorStop(0, '#03ff00');
		gradient.addColorStop(1, '#127909');
		ctx.fillStyle = gradient;
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.beginPath();
		ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}

var time = 0;
var ball = new cannonBall;

function loop() {
	requestAnimationFrame(loop);
	ctx.canvas.width = field.offsetWidth;
	ctx.canvas.height = field.offsetHeight;
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

	ball.draw();
	if(ball.scale > 8){
		ball.scale -= 0.5;
	}
	time++;
}

loop();