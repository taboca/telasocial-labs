This is a development technote that explains how to setup [forever](https://github.com/nodejitsu/forever) with a Node.js app so it runs like a daemon on Ubuntu Linux. Forever will automatically start the Node.js application when your Linux server starts and ensure it stays running. This article received a great review and contribution from [Johnoshum](https://github.com/johnoshum).

# Overview 

Node.js is built on Chrome's [V8 JavaScript Engine](http://code.google.com/p/V8).  It's useful for a range of applications and it brings JavaScript to the server.  Applications written in Node.js are event-driven.  For example, if you wanted to create a file, you would provide a callback function to be called upon the file's successful creation.  In this sort of model, your app doesn't become stuck waiting for events to finish executing.


## What you'll need

* [The Node.js runtime](http://nodejs.org)
* [The npm package manager](http://npmjs.org)


## Installing Node.js

I found it easiest to install Node.js from source.  Ubuntu's packaged version is very out-of-date, and the "node" program is renamed "nodejs."  This confuses many scripts that work with it, including forever.  Compilation is straightforward; after uncompressing and cd-ing into the source directory, follow the standard

    ./configure
    make
    sudo make install


## Installing forever 

forever, developed by nodejitsu, has functions to create applications that are always running&mdash;"forever" running.  If the application dies, forever brings it back.  It has built-in functionality to monitor processes.  It also offers an API you can use to incorporate its features into your own code. 

forever can be installed using npm.  npm should have been installed as part of Node.js: 

    sudo npm -g install forever

## Running a sample app 

Create the file test.js with the following contents:

    var http = require('http');

    http.createServer(function (request, response) {
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end('testing. . .\n');
    }).listen(8124);

    console.log('Server running at http://127.0.0.1:8124/');

Then run:

    node test.js

Note: With Debian, you may have to enter the following into the console to get this to work:

    export PATH=$PATH:/usr/local/bin
    export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules

Point your browser to http://127.0.0.1:8124.  It should simply say "testing. . ."  Now you use forever to manage your application:

    forever start test.js

Note: If you installed forever as a normal user or in "local" mode (without the -g switch above), it may be located in your current working directory.  For example, if you installed from your home directory, it would be in ~/node_modules/.bin.  In this case, you'll have to run it like this for the rest of the tutorial:

    ~/node_modules/.bin/forever start test.js

You may also have problems later if you want to run forever at boot; if you do want to, be sure to install with -g as root.

forever should say something like:

    info:   Running action: start
    info:   Forever processing file: test.js

Stopping the app is similar:

    forever stop test.js

forever now says something like:

    info: Running action: stop
    info: Forever stopped process:
    data: uid  command script  forever pid  logfile uptime       
    [0] Bce7 node    test.js 33483   33484 /Users/marciogalli/.forever/Bce7.log 0:0:0:51.143 


## Note about logs and system messages

forever keeps logs, stdout and stderr messages in a file associated with your process.  Look for the hidden .forever directory in the home directory of the user you ran forever as. 


## Making your forever app launch at boot

### Ubuntu
If you've installed forever and Node.js system-wide (so that they are located somewhere in $PATH), you can have your app started by forever at system-boot using Ubuntu's upstart.  All you need to do is create a file named something like myapp.conf in /etc/init with the following contents:

    start on startup
    exec forever start /full/path/to/test.js

### Debian

You will need to create a script in the directory /etc/init.d.  The most basic script handles at least the arguments "start" and "stop."

You will need to pass the "-p" path so Forever can setup a working directory where it keeps information about running processes. Without this directory your app may fail when it needs to restart or if you need to run the stop action.

    #!/bin/sh
    #/etc/init.d/nodeup
    
    export PATH=$PATH:/usr/local/bin
    export NODE_PATH=$NODE_PATH:/usr/local/lib/node_modules
    
    case "$1" in
      start)
      exec forever --sourceDir=/path/to/directory/containing_script -p /path/to/forever/pidetcfiles script.js scriptarguments
      ;;
    stop)
      exec forever stop --sourceDir=/path/to/directory/containing_script script.js
      ;;
    *)
      echo "Usage: /etc/init.d/nodeup {start|stop}"
      exit 1
      ;;
    esac
    
    exit 0

Make the script executable:

    chmod 755 /etc/init.d/nodeup

And set it to go up and down with the system via Debian's update-rc.d:

    update-rc.d nodeup defaults

Stop it from coming up with:
 
    update-rc.d -f nodeup remove

## Notes

Note that if you use 'exec' it will run the script as the current process. So if you want multiple executions you may want to drop using exec. Let's say you want to launch multiple forever scripts. 

## References

* [Keep a node.js server up with Forever](http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever)
* [node.js as a simple web server](http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server)
* [Node Packaged Modules](http://npmjs.org/)
* [nodejitsu / forever](https://github.com/nodejitsu/forever)
* [Making scripts run at boot time with Debian](http://www.debian-administration.org/articles/28)

