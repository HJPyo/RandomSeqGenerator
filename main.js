'use strict'

/* make random sequence array */

var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
myModal.toggle();
var seqArray = [];

function start() {
	var formData = option.txt.value;
	if (formData * 0 === 0 && formData != "") {
		if (3 <= formData && formData <= 10000) {
			myModal.toggle();
			for(var i = 0; i < formData; i++) seqArray.push(i + 1);
			for(var i = 0; i < formData; i++){
				var rand = Math.floor(Math.random() * formData);
				var tmp = seqArray[i];
				seqArray[i] = seqArray[rand];
				seqArray[rand] = tmp;
			}
			console.log(seqArray);
		} else {
			document.getElementById('lb1').style.display = 'none';
			document.getElementById('lb2').style.display = 'block';
		}
	} else {
		document.getElementById('lb1').style.display = 'block';
		document.getElementById('lb2').style.display = 'none';
	}
}

/* make canvas */

const field = document.querySelector('#field');
const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');
ctx.canvas.width = field.offsetWidth;
ctx.canvas.height = field.offsetHeight;

class cannonBall {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.scale = 20;
	}
	draw() {
		var nx = this.x + (myCanvas.width / 2);
		var ny = this.y + (myCanvas.height / 2) - 200 + (600 / this.scale);
		var radius = myCanvas.height / this.scale;
		var gx = nx - radius;
		var gy = ny - radius;
		var gradient = ctx.createRadialGradient(gx, gy, radius / 2, nx, ny, radius * 2);
		gradient.addColorStop(0, '#03ff00');
		gradient.addColorStop(1, '#127909');
		ctx.fillStyle = gradient;
		ctx.strokeStyle = 'rgba(0,0,0,0)';
		ctx.beginPath();
		ctx.arc(nx, ny, radius, 0, Math.PI * 2);
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
	if (ball.scale > 5) {
		ball.scale -= 0.5;
	}
	time++;
}

loop();