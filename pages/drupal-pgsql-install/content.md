This is a technote with details about installing Drupal on Ububtu. In this project, we use Drupal as a system to post articles and a TelaSocial component, TagVisor, to make the articles become an animated slide experience. 


## LIVE NOTE — This article has a bounty program associated with it. If you are willing to participate you will get a your name here and also a reward.  If you accept the terms and conditions, please visit the project at [Amazon mTurk](https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=A2R9MB4V6CG1WY)

First, let's set up the basic Drupal environment. We will install and configure Apache, PostgreSQL and PHP. 

## Apache

In this project we use the Apache Web Server and build it from the source code. 

Download it from

* http://httpd.apache.org/download.cgi

Make sure your system is able to build it: 

* apt-get install build-essentials
 
On my system I uncompressed the tarball to the following directory: 

    /home/marcio2/apache/httpd-2.2.22/

We need to use the build option '--enable-so'. This will generate an Apache server that can dynamically load .so files--libraries.  PHP and its modules will be loaded as .so files later in this article. 

    cd httpd-2.2.22/
    ./configure --enable-so
    make
    make install

## PHP 

Download it from 

* http://www.php.net/get/php-5.4.5.tar.gz/from/a/mirror

Install a few requirements, build and install it:

    apt-get install libxml2
    apt-get install libxml2-dev
    apt-get install zlib1g
    apt-get install zlib1g-dev
    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-mysql --with-zlib
    make
    make install

You may need to install with libpng so that PHP works with GD:

    apt-get install libpng-dev

Since we are installing Drupal 7 we will need to build PHP with the PDO extensions (see [http://php.net/manual/en/ref.pdo-pgsql.php].)  This is the infrastructure that will make the connection between PHP and PostgreSQL.

    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-pgsql --with-zlib --with-gd --with-pdo-pgsql 
    make
    make install

The libphp5.so file will be installed to your Apache installation folder, which is probably /usr/local/apache2/modules.  Copy over a default configuration file for PHP:

    cp php.ini-development /usr/local/lib/php.ini

## Apache conf

Edit your Apache configuration file, httpd.conf.  It's probably somewhere like /usr/local/apache2/conf/httpd.conf.

    <FilesMatch "\.php$">
      SetHandler application/x-httpd-php
    </FilesMatch>

    LoadModule php5_module        modules/libphp5.so

    AddType application/x-httpd-php .php

    DocumentRoot "/var/www/html"

We need AllowOverride All rather than the defualt of None.  Drupal needs this to be able to override settings on a per-directory basis later on.

    <Directory "/var/www/html">
      Options Indexes FollowSymLinks
      AllowOverride None
      Order allow,deny
      Allow from all
    </Directory>

Just replace "None" with "All" there. 

## PostgreSQL installation

Download it from:

* http://www.postgresql.org/ftp/source/v9.1.4/

Readline make doing things from the console more pleasant.  Then build it:

    apt-get install libreadline-dev
    ./configure
    make
    make install

And set up a few things:

## PostgreSQL configuration for Drupal

    adduser postgres
    cd /usr/local/pgsql
    mkdir data 
    chown -R postgres:postgres * 
    su - postgres
    ./initdb -D /usr/local/pgsql/data
 
Create a database for Drupal:

    /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data
    ./createdb --encoding=UTF8 --owner=postgres drupal

If you have problems related UTF8, templates and such, you'll need to pass --template=template0 to createbd (as per their documentation): 

    ./createdb --encoding=UTF8 --owner=postgres --template=template0 drupal

And. . .a databasse user: 

    ./createuser --pwprompt --encrypted --no-createrole --no-createdb YOUR_DB_USER 

## Drupal Preparation

Get it here:

* http://drupal.org/project/drupal

Copy the untarred folder to (not in) /var/www/html:

    tar -xzvf drupal-7.17.tar.gz  
    mv drupal-7.17 /var/www/html
  
Make sure the .htaccess is still present, which it should be if you mv-ed it as above.  It might not be if you tried to copy/paste from a file browser or something. 

Check the owner for the files under /var/www/html--if you are going with root (brave) you need to make sure all the files under /var/www/html are root:root. 

This is important, so Drupal can record settings during installation:

    cd /var/www/html 
    chmod a+w sites/default

    cp ./sites/default/default.settings.php ./sites/default/settings.php

Restart Apache--if you don't have a script in /etc/init.d, you will need to make one, e.g., something like: 

    #!/bin/bash
    /usr/local/apache2/bin/apachectl $@

## Drupal Installation

Use any browser and go to http://your_host_name:80,

It should be pretty self-explanatory.

After the install, be sure to make the settings file unwritable again:

    chmod go-w sites/default/settings.php
    chmod go-w sites/default

## References

* [Postgresql installation](http://www.postgresql.org/docs/8.0/static/installation.html)
* [Template0 for Postgresql with UTF8](http://www.wetware.co.nz/2010/07/error-new-encoding-utf8-is-incompatible-with-the-encoding-of-the-template-database-sql_ascii/)

## To be continued - mgalli at telasocial dot com


After the Drupal installation.

## Making your PostgreSQL as a service

Instead of compiling PostgreSQL, you can apt-get install it and it already comes as a service.

http://archives.postgresql.org/pgsql-php/2004-03/msg00056.php


