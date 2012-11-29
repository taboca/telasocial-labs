This is a technote with details about a Drupal instalation compiling from source. In this project, we have used Drupal as a system to post articles and a TelaSocial component, TagVisor, to make the articles become an animated slides experience. 

# This article received contributions from (johnshum)[https://github.com/johnoshum/telasocial-labs/commit/037b8b0c3bef532a8ca6647dbaee61cfacc4fa1f]

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

Since we are installing Drupal 7 we will need to make php with the (pdo extensions)[http://php.net/manual/en/ref.pdo-pgsql.php]. This is an infra-estruture that will make the connection between PHP and Postgresql.

    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-pgsql --with-zlib --with-gd --with-pdo-pgsql 
    make
    make install

The libphp.so file will be installed to your apache2 installation folder which is probably /usr/local/apache2/modules

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

Note that the following will have AllowOverride All, instead of None, so that in ta further section, Drupal, you will have the Drupal files to be able to control directivies for the /var/www/html directory: 

    <Directory "/var/www/html">
      Options Indexes FollowSymLinks
      AllowOverride None
      Order allow,deny
      Allow from all
    </Directory>

So change the above with 

      AllowOverride All

## Postgresql installation

You can download the source from (Postgresql site)[http://www.postgresql.org/ftp/source/v9.1.4/]. Then you are ready to build:

    apt-get install libreadline-dev
    ./configure
    make
    make install

## Postgresql configuration for Drupal

    adduser postgres
    cd /usr/local/pgsql
    mkdir data 
    chown -R postgres:postgres * 
    su - postgres
    ./initdb -D /usr/local/pgsql/data
 
Next we will run postgress so we can create the DB

    /usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data
    ./createdb --encoding=UTF8 --owner=postgres drupal

If you hit a problem related to UTF8 and template, you will certainly need to pass the --template=template0 which is from their documentation: 

    ./createdb --encoding=UTF8 --owner=postgres --template=template0 drupal

And the user: 

    ./createuser --pwprompt --encrypted --no-createrole --no-createdb YOUR_DB_USER 

## Download Drupal

    http://drupal.org/project/drupal

In my case I am using Drupal 7.17 — from November 2012. Once you download you can move it to your home html files — in my case it's /var/www/html (a directory which is associated with the above httpd configuration.)

    tar -xzvf drupal-7.17.tar.gz  
    mv drupal-7.17 /var/www
    cd /var/www
    mv drupal-7.17 html
  
Make sure to preserve the .htaccess file. If you simply move files around you may lose the .htaccess file. 

## Installing Drupal 

Check the owner for the installed files under /var/www/html — if you are going with root (brave) you need to make sure all the files unver /var/www/html are root:root. 

## Changing permissions so installer writes 

    cd /var/www/html 
    chmod a+w sites/default

    cp ./sites/default/default.settings.php ./sites/default/settings.php

## Run install 
 
Restart your Apache2 — if you do have a script in /etc/init.d you will need to make one. I am using: 

    #!/bin/bash
    /usr/local/apache2/bin/apachectl $@

## Web install

Access your host with http://your server:80

Remember to check the permissions after the install

    chmod go-w sites/default/settings.php
    chmod go-w sites/default

## References

* (Postgresql installation)[http://www.postgresql.org/docs/8.0/static/installation.html]
* (Template0 for Postgresql with UTF8)[http://www.wetware.co.nz/2010/07/error-new-encoding-utf8-is-incompatible-with-the-encoding-of-the-template-database-sql_ascii/])

## Making PostgreSQL a service

As it stands, the instructions in this article will have Apache running as a "service," so that it can be set to start and stop automatically with the system, but not so for PostgreSQL.  (PHP doesn't need to be started or stopped this way, as it's just called upon as needed.)  The answer is simple; we just need a script like the one that was suggested for Apache above.  Create the following in /etc/init.d:

    #!/bin/bash
    su -c "/usr/local/pgsql/bin/pg_ctl $@ -D /var/lib/pgsql/db -l /var/lib/pgsql/bd/serverlog" pgsql

and make it executable.


