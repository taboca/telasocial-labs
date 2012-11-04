
var canvasT = null; 
var canvasM = null;
var video = null;  
var ctx = null; 
var listText = ['Sugar Cane','is','burned','in','Brazil'];

function changeVideo(ii) { 
	var videoURL = document.getElementById("videoselection").options[ii].value;
  	document.getElementById("video").setAttribute("src",videoURL);
} 

function start() {
  document.getElementById("maskbound").addEventListener("click",divein,false);
  listText = document.getElementById('slides').value.split(' ');
  renderNextMask("Welcome and Click");
  fixInitial(); 
}

function restart() { 
  listText = document.getElementById('slides').value.split(' ');
  pointer=0;
  renderNextMask("Welcome and Click");
  fixInitial(); 
} 

var prefixes = ["moz","o","webkit"];

function fixInitial() { 
 	var scale=.51;
	var buffer="";
	for (var k=0;k<prefixes.length;k++) { 
		buffer+= "-"+prefixes[k]+"-transform-origin: 0 0; -"+prefixes[k]+"-transform:scale("+scale+");";
	} 
	document.getElementById("reflectionmask").setAttribute("style",buffer);

} 

var diving = false;

var angleCounter = 180;
function divein() { 
	if(diving) { 
	} else { 
		diving=true;
	var scale=44;
	var buffer = "";
	for (var k=0;k<prefixes.length;k++) { 
		buffer+= "-"+prefixes[k]+"-transition-property: -"+prefixes[k]+"-transform opacity; -"+prefixes[k]+"-transform-origin: 320 180; -"+prefixes[k]+"-transform:scale("+scale+") rotate("+angleCounter+"deg) translate(0px); -"+prefixes[k]+"-transition-duration:3s; opacity:1 ";
	} 
	angleCounter+=180;
	document.getElementById("maskbound").setAttribute("style",buffer);
	setTimeout("diveout()",3000);
	} 
} 

function diveout() { 
	diving=false;
	if(listText[pointer] != undefined) { 
		renderNextMask(listText[pointer++]);
	} else { 
		pointer=0;
		renderNextMask(listText[pointer++]);
	} 
	var scale=1;
	var buffer = "";
	for (var k=0;k<prefixes.length;k++) { 
		buffer+= "-"+prefixes[k]+"-transition-property: -"+prefixes[k]+"-transform, opacity; -"+prefixes[k]+"-transform-origin: 320 180; -"+prefixes[k]+"-transform:scale("+scale+") rotate("+angleCounter+"deg) translate(0px); -"+prefixes[k]+"-transition-duration:3s; opacity:1";
	} 
	angleCounter+=180;
	document.getElementById("maskbound").setAttribute("style",buffer);


} 


var pointer = 0;


var nextCanvas = null;
var videoSwitch = 0;

function renderNextMask(str) { 
	var canvas = document.createElement("canvas");
	canvas.width=1280;
	canvas.height=720;
	canvas.style.width="1px";
	canvas.style.height="1px";
	document.body.appendChild(canvas);
	nextCanvas = canvas;

	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "rgba(255, 255, 255, 1)";

	var elm = str;
	ctx.font = "200px Times"; 
	var ww = ctx.measureText(elm);
	var defaultSize = 180;
	if(ww.width>1280) { 
		defaultSize = 180*(1280/ww.width);
		ctx.font = parseInt(defaultSize)+"px Times"; 
		ww = ctx.measureText(elm);
	} 
	ctx.fillText(elm, parseInt(1280/2)-parseInt(ww.width/2),380);

 	ctx.save();
	ctx.translate(0, 0);
	//ctx.fillText(elm,0,220);
	ctx.restore();

  var canvas2 = document.getElementById('reflectionmask')
  var ctx2 = canvas2.getContext('2d');

  blend(canvas, canvas2, 1280, 720);

}



