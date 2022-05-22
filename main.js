let timer = setInterval(tick, 1000);
let currentYear = new Date().getFullYear();
let christmasDate = new Date(`December 24, ${currentYear} 00:00:00`).getTime(); //getTime = miliseconds
let monthsLeft = 11 - new Date().getMonth();

// Amount of Snowflakes
var snowMax =  monthsLeft > 6 ? 5 : monthsLeft > 1 ? 10 : 30;

// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];

// Snow Entity
var snowEntity = "&#x2022;";

// Falling Velocity
var snowSpeed = monthsLeft > 6 ? 0.3 : monthsLeft > 1 ? 0.5 : 1;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 30;

// Refresh Rate (in milliseconds)
var snowRefresh = 20;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";


var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

function tick(){
    let currentTime = new Date().getTime();

    let ile = christmasDate - currentTime; 

    if(ile > 0){
        let days = Math.floor(ile / (1000 * 60 * 60 * 24)); 
        if (days < 10){days = "0" + days;}

        let hours = Math.floor((ile % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (hours < 10) {hours = "0" + hours;}

        let minutes = Math.floor((ile % (1000 * 60 * 60))/ (1000*60));
        if (minutes < 10) {minutes = "0" + minutes;}

        let seconds = Math.floor((ile % (1000 * 60))/ 1000);
        if (seconds < 10) {seconds="0" + seconds;}

        let time = `${days} : ${hours} : ${minutes} : ${seconds}`;

        document.getElementById('timer').innerText = time;
    }
}


window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
window.addEventListener('load', tick())


