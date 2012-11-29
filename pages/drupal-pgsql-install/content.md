This is a technote with details about a Drupal instalation compiling from source. In this project, we have used Drupal as a system to post articles and a TelaSocial component, TagVisor, to make the articles become an animated slides experience. 

# Contributors

This article received contributions from (johnshum)[https://github.com/johnoshum/telasocial-labs/commit/037b8b0c3bef532a8ca6647dbaee61cfacc4fa1f]

First, let's set up a basic LAMP-like environment. We will install and configure Apache, PostgreSQL and PHP. 

## Apache

In this project we use the Apache Web Server and build it from the source code.  You'll need the "Apache Portable Runtime," and from the same page, "APR-util.".

### Download

<http://apr.apache.org/download.cgi>

<http://httpd.apache.org/download.cgi>

Make sure your system is able to build it: 

    apt-get install build-essential
 
I'd suggest you create a build directory to download and build everything, for instance ~/src.  Tarballs almost inevitably extract into separate directories, so you don't have to worry about things getting mixed up.

`cd` into the APR directory and perform the standard install procedure, e.g.

    ./configure
    make
    sudo make install

Next do APR-util.  You'll need to tell it where APR is:

    ./configure --with-apr=/usr/local/apr
    make
    sudo make install

__Note__: You should _never_ have to configure or make as root.

One last thing we'll need, but won't bother compiling from source:

    sudo apt-get install libpcre3 libpcre3-dev

We need to use the build option '`--enable-so`'. This will generate an Apache server that can dynamically load .so files&mdash;libraries.  PHP and its modules will be loaded as .so files later in this article. 

    cd httpd-2.4.3/
    ./configure --enable-so
    make
    sudo make install

## PostgreSQL

### Download

<http://www.postgresql.org/ftp/source/>

The latest version as of this writing is 9.2.1.  

Readline makes doing things from the console more pleasant.  Then build it:

    sudo apt-get install libreadline6 libreadline6-dev
    ./configure
    make
    sudo make install

Now set up an account that owns the databases and initialize the database:

    sudo adduser --home=/var/lib/pgsql --shell=/bin/bash --disabled-password pgsql
    sudo -u pgsql /usr/local/pgsql/bin/initdb -D /var/lib/pgsql/db
    sudo -u pgsql /usr/local/pgsql/bin/postgres -D /var/lib/pgsql/db &
    sudo -u pgsql /usr/local/pgsql/bin/createdb --encoding=UTF8 --owner=pgsql drupal

If you have problems related to UTF8 and template, add --template=template0 to the createdb line above.

Finally, create a database user for Drupal.  You'll be prompted for a password; remember it and the name (here "drupal") you choose here for the Drupal installation:


    sudo -u pgsql /usr/local/pgsql/bin/createuser --pwprompt --encrypted --no-createrole --no-createdb drupal

See the end of this article for information about making PostgreSQL a "service."

## PHP 

###Download

<http://us3.php.net/get/php-5.4.9.tar.bz2/from/a/mirror>

PHP takes awhile to compile.  You may need to install libpng so that PHP can use GD (an image manipulation library that Drupal wants.)  We will also build with [PDO extensions](http://php.net/manual/en/ref.pdo-pgsql.php).  Install a few other requirements, build and install it:

    sudo apt-get install libpng12-0 libpng12-dev
    sudo apt-get install libxml2 libxml2-dev
    sudo apt-get install zlib1g zlib1g-dev
    ./configure --with-apxs2=/usr/local/apache2/bin/apxs --with-pgsql --with-zlib --with-gd --with-pdo-pgsql=/usr/local/pgsql/bin
    make
    sudo make install

Copy over a default configuration file for PHP:

    sudo cp php.ini-development /usr/local/lib/php.ini

## Apache configuration

Edit your Apache configuration file, httpd.conf.  It's probably somewhere like /usr/local/apache2/conf/httpd.conf.  Search for an "AddType something-or-other" section and add this stuff after it:

    AddType application/x-httpd-php .php
    AddType application/x-httpd-php-source .phps

In case it's not already present somewhere, add (or uncomment) this next to the other LoadModule lines:

    LoadModule php5_module        modules/libphp5.so

Find the DocumentRoot line and change it to:

    DocumentRoot "/var/www/html"

Similarly, change all the &lt;Directory "/some/path"&gt; lines to have "/var/www/html".  Do not change other lines, like ServerRoot.

We need AllowOverride All rather than the defualt of None.  Drupal needs this to be able to override settings on a per-directory basis later on.  Like this (give or take comments):

    <Directory "/var/www/html">
      Options Indexes FollowSymLinks
      AllowOverride None
      Order allow,deny
      Allow from all
    </Directory>

Just replace "None" with "All" there. 


## Drupal Preparation

Get it here:

<http://drupal.org/project/drupal>

Copy the _contents_ of the untarred directory to (not in) /var/www/html.  If you don't, your site URL will have the directory name included in its path:

    tar xzvf drupal-7.17.tar.gz
    mkdir /var/www  
    sudo mv drupal-7.17 /var/www/html
  
Make sure the .htaccess is still present in /var/www/html, which it should be if you mv-ed it as above.  It might not be if you tried to copy/paste from a file browser or something.  It's a security risk, so check.

Check the owner for the files under /var/www/html--if you are going with root (brave) you need to make sure all the files under /var/www/html are root:root. 

    sudo chown -R root:root /var/www/html

This is important, so Drupal can record settings during installation:

    cd /var/www/html 
    sudo cp ./sites/default/default.settings.php ./sites/default/settings.php
    sudo chmod -R a+w sites/default

Restart Apache--if you don't have a script in /etc/init.d, you will need to make one, e.g., something like: 

    #!/bin/bash
    /usr/local/apache2/bin/apachectl $@

and make it executable.  Then do

    service script_name restart

## Drupal Installation

Use any browser and go to http://localhost or http://your_host_name:80,

It should be pretty self-explanatory.

After the install, be sure to make the settings file unwritable again:

    sudo chmod go-w sites/default sites/default/settings.php

## Making PostgreSQL a service

As it stands, the instructions in this article will have Apache running as a "service," so that it can be set to start and stop automatically with the system, but not so for PostgreSQL.  (PHP doesn't need to be started or stopped this way, as it's just called upon as needed.)  The answer is simple; we just need a script like the one that was suggested for Apache above.  Create the following in /etc/init.d:

    #!/bin/bash
    
    su -c "/usr/local/pgsql/bin/pg_ctl $@ -D /var/lib/pgsql/db -l /var/lib/pgsql/bd/serverlog" pgsql

and make it executable.

## References

* [Postgresql installation](http://www.postgresql.org/docs/8.0/static/installation.html)
* [Template0 for Postgresql with UTF8](http://www.wetware.co.nz/2010/07/error-new-encoding-utf8-is-incompatible-with-the-encoding-of-the-template-database-sql_ascii/)


