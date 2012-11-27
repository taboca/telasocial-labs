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

## PHP 

Download from 

* http://www.php.net/get/php-5.4.5.tar.gz/from/a/mirror

And let's make it

    apt-get install libxml2
    apt-get install libxml2-dev
    #apt-get install zlib1g #already had
    apt-get install zlib1g-dev
    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-mysql --with-zlib
    make
    make install

You may need to install with libpng so PHP works with GD. If this is your case, then install libpng-dev: 

    apt-get install libpng-dev

    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-mysql --with-zlib --with-gd --enable-gd
    make
    make install

    cp php.ini-development /usr/local/lib/php.ini

## Apache conf

Edit your Apache configuration, httpd.conf, my installation is under /usr/local/apache2

/usr/local/apache2/conf/httpd.conf

    <FilesMatch "\.php$">
      SetHandler application/x-httpd-php
    </FilesMatch>

    LoadModule php5_module        modules/libphp5.so

    AddType application/x-httpd-php .php

    DocumentRoot "/var/www/html"

    <Directory "/var/www/html">
      Options Indexes FollowSymLinks
      AllowOverride None
      Order allow,deny
      Allow from all
    </Directory>

## To be continued - mgalli at telasocial dot com
