This is a client side demonstration that makes pixel manipulations with data from a live web cam — grayscale, inversed, emboss, and more. 
 
## GetUserMedia

This API is available now in JavaScript with modern web browsers such as Chrome ( tested with Canary .) You can use this interface to request permission to the webcam and associate a callback in JavaScript. 

If the page is served from a remote domain site, the browser will request permission to the user. When permission is granted, your registered callback should called and and a stream will be passed. 

Use the URL.createObjectURL to find the URL so you can associate with a video tag. 

      document.getElementsByTagName("video")[0].setAttribute("src",URL.createObjectURL(stream));


## Live manipulation with pixels from webcam (sample) 

* [Check the simple webcam to canvas demo](simple)

## References

* [CamCanvas - older approach using webcam flash](http://taboca.com/p/camcanvas/)
* [WebRtc Demos](http://www.webrtc.org/running-the-demos) 


