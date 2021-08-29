'use strict'

/* make random sequence array */

var myModal = new bootstrap.Modal(document.getElementById('modal'), {});
myModal.toggle();
var seqArray = [];
var isOverlabed = false;

function start() {
	var num = option.txt.value;
	var chk1 = option.chk1.checked;
	var chk2 = option.chk2.checked;
	if (num * 0 === 0 && num != "") {
		if (3 <= num && num <= 10000 && num == Math.floor(num)) {
			myModal.toggle();
			for (var i = 0; i < num; i++) seqArray.push(i + 1);
			for (var i = 0; i < num; i++) {
				var rand = Math.floor(Math.random() * num);
				var tmp = seqArray[i];
				seqArray[i] = seqArray[rand];
				seqArray[rand] = tmp;
			}
			if (chk1) isOverlabed = true;
			if (chk2) {
				var outter = document.getElementById('outter');
				var inner = document.getElementById('field');
				outter.className = 'd-flex flex-column justify-content-center vh-100';
				inner.className = 'my-wmax my-hmax';
			}
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
		var ny = this.y + (myCanvas.height / 5) + (600 / this.scale);
		var radius = myCanvas.height / this.scale;
		var gx = nx - radius;
		var gy = ny - radius;
		var gradient = ctx.createRadialGradient(gx, gy, radius / 2, nx, ny, radius * 2);
		gradient.addColorStop(0, '#03ff00');
		gradient.addColorStop(1, '#127909');
		ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(nx, ny, radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}

class ballNum {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.scale = 20;
		this.num = 'none';
	}
	draw() {
		var sz = String(myCanvas.height / this.scale / 1.5);
		ctx.font = sz + "px Do Hyeon";
		var nx = this.x + (myCanvas.width / 2) - (ctx.measureText(String(this.num)).width / 2);
		var ny = this.y + (myCanvas.height / 5) + (700 / this.scale);
		ctx.fillStyle = 'yellow';
		ctx.fillText(this.num, nx, ny);
	}
}
/*
class cloud{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.speed = 1;
	}
	draw(){
		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.beginPath();
		ctx.arc(x, y, 100, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
}
*/
var time = 0;
var ball = new cannonBall;
var number = new ballNum;
//var _cloud = new cloud;

function loop() {
	requestAnimationFrame(loop);
	ctx.canvas.width = field.offsetWidth;
	ctx.canvas.height = field.offsetHeight;
	ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

//	_cloud.draw();
	ball.draw();
	number.draw();
	if (ball.scale > 5) {
		ball.scale -= 0.5;
		number.scale -= 0.5;
	}
	time++;
}

/* launch */

var cnt = 0;
var numLog = document.getElementById('log');
function launch() {
	if (isOverlabed) {
		ball.scale = 20;
		number.scale = 20;
		number.num = seqArray[Math.floor(Math.random() * seqArray.length)];
	} else if (cnt < seqArray.length) {
		ball.scale = 20;
		number.scale = 20;
		number.num = seqArray[cnt];
	} else {
		numLog.innerHTML += '<div class=\"log-inner font-dh\">모든공을 발사하였습니다.</div>'
		numLog.scrollTop = numLog.scrollHeight;
	}
	if(isOverlabed || cnt < seqArray.length){
		numLog.innerHTML += '<div class=\"log-inner d-flex justify-content-between font-dh\"><p>[' + (cnt + 1) + '] : </p><p>' + number.num + '번</p></div>';
		numLog.scrollTop = numLog.scrollHeight;
	}
	if (cnt == 0) loop();
	cnt++;
}

/* ect */

function reload() {
	window.location.reload();
}