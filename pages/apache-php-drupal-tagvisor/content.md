This is a technote with details about a Drupal instalation. In this project, we have used Drupal as a system to post articles and a TelaSocial component, TagVisor, to make the articles become an animated slides experience. 

First let's get the basic environment so your Drupal works. We will need Apache2, Postgresql, PHP and configurations to these systems. 

## Apache2

In this project we have decided to use the Apache Web Server, Apache2, and build it from the source code. 

* Download from http://httpd.apache.org/download.cgi

Make sure your system is able to build Apache, 

* apt-get install build-essentials
 
With my system I have uncompressed the tarball to the following directory: 

    /home/marcio2/apache/httpd-2.2.22/

In order to get your PHP module working you need to make sure to use the option '--enable-so'. This will generate an Apache server that can dynamically load .so files, libraries. And PHP will be loaded as an .so file — later in this article. 

    cd httpd-2.2.22/
    ls -l
    ./configure --enable-so
    apt-get install build-essentials
    apt-get install build-essential
    ./configure --enable-so
    make
    make install

## To be continued - mgalli at telasocial dot com
