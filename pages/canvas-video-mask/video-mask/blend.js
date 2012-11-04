
function blend(canvasA, canvasB, width, height) {
   var mapA = canvasA.getContext("2d").getImageData(0,0,width,height);
   var mapB = canvasA.getContext("2d").getImageData(0,0,width,height);
   var c=0;var d=0;
   for(var i=0;i<height;i++) { // square stupid 
        for(var j=0;j<width;j++) { // square stupid
              var r_A = mapA.data[c+0];
              var g_A = mapA.data[c+1];
              var b_A = mapA.data[c+2];
	      var gray = parseInt((r_A+g_A+b_A)/3);
              mapB.data[c+0] = 0;
              mapB.data[c+1] = 0;
              mapB.data[c+2] = 0;
              mapB.data[c+3] = 255-gray;
        c+=4;
       }
   }
   canvasB.getContext("2d").putImageData(mapB, 0,0);
}

