Notes related to an installation of Django with Apache 2 in a Debian Linux system.

## Requirements

### Apache2 

In this case it was created from source code and it is under 

    /usr/local/apache2/

### Python 

Was priorly installed in my system from the distribution packages so it's located under the following directory. This case refers to version 2.6.6

    /usr/bin/python 

### Python-dev

In order to build the WSGI adapter module for Apache it's important to have 

    apt-get install python-dev

## Download WSGI Module

    http://code.google.com/p/modwsgi/

## Build 

You will need to identify the path to the apxs.

    ./configure --with-apxs=/usr/local/apache2/bin/apxs --with-python=/usr/bin/python2.6
    make 
    make install

## Configure the module within Apache

    LoadModule wsgi_module modules/mod_wsgi.so

Restart your apache2 

    /etc/init.d/apache2 restart

## Download Django 

Django will work with any version of Apache which supports mod_wsgi so you should be all set. 
  
    https://www.djangoproject.com/download/

In this case we are using the 1.4.3 version. You should download, unpack it and do: 
    
    python setup.py install

## Apache2 virtual host configuration

    <VirtualHost 69.164.219.15:80>
       ServerAdmin mgalli@mgalli.com
       DocumentRoot /var/www/telasocial.com.br
       ServerName www.telasocial.com.br
       ServerAlias telasocial.com.br
       ErrorLog /var/www-logs/telasocial.com.br-error_log
       CustomLog /var/www-logs/telasocial.com.br-access_log combined

       WSGIDaemonProcess my_site_app
       WSGIProcessGroup my_site_app
       WSGIScriptAlias / /var/www/my_site_app/my_site_app/wsgi.py

       <Directory /var/www/my_site_app/my_site_app>
         <Files wsgi.py>
           Order deny,allow
           Allow from all
         </Files>
       </Directory>
    </VirtualHost>


## Create your app dir 

    django-admin.py startproject my_site_app 
    mv my_site_app /var/www

And look for an inner directory with the wsgi.py which is going to be the root of your application. Make sure you add your application's path to the wsgi.py

    import os,sys

    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    if path not in sys.path:
        sys.path.append(path)

    path = '/var/www/my_site_app/my_site_app'
    if path not in sys.path:
        sys.path.append(path)

