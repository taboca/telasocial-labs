function gen() { 
	var text = document.getElementById('text').value;
	var buffer='data:text/html;charset=utf-8,'+escape(text);
	document.getElementById('out').src=buffer;
	document.getElementById('out').setAttribute('style','transition-property: height; transition-duration:1s; height:200px');
} 
