This technote covers a problem with library path using OpenCV — when the app kicks an error that asks to rebuild the library path / install libgtk2.

## OpenCV tells me to use gtk2 

If you get the following error: 

    Rebuild the library with  Windows, GTK+ 2.x or Carbon support. If you are on Ubuntu or Debian,  install libgtk2.0-dev and pkg-config, then re-run cmake or configure  script in function cvNamedWindow<

#Solution

Make sure the right OpenCV libraries are being used. You may have to check if you did 'make install' properly after compiling the GTK2+ based OpenCV libraries.  

<h2>Actual use case, my problem</h2>

After the problem, I did install libgtk2.0-dev ( pkg-config ) and the problem continued. My problem was that I did "make install" after compiling ( cmake and make ) before I had the libgtk2.0-dev installed. 

Even informing LD_LIBRARY_PATH = to use the install of newer ( gtk2 compatible ) OpenCV, the OpenCV make continued to use the libraries from the prior install ( /usr/local/lib ). So the temporary solution was to simply do the "make install" from the build directory of the newer OpenCV ( gtk 2 ) and the sample build process worked. 


<p><a href='http://opencv.willowgarage.com/wiki/InstallGuide_Linux'>Install Guide Linux</a></p>

In fact since my system is Ubuntu Server 11, I had to install the file /etc/ld.so.conf.d/opencv.conf  with the contents being the path of the directory where OpenCV installed its' libraries, in my case "/usr/local/lib". 

##References

The installation I did, for OpenCV libraries, where steps 1) 2) and 3) from here: 

* <a href='http://opencv.willowgarage.com/wiki/InstallGuide'>Installation Guide</a>.


