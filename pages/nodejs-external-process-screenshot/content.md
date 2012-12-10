In this technote, we'll build a simple Node.js application that spawns an external process.  We'll cover two different ways of doing that.  The external process will be a shell script that takes a screen shot of the server's root window.  We'll set up a file server to serve the image.  Finally, we'll set up our application to run at system boot.


## Introduction

You'll need Node.js and npm, its package manager.  It's possible to use npm to install packages anywhere, but it's simpler if you always use the `-g` switch to install globally on the system.

For the purposes of this technote, I've created the diretory `$HOME/screenshot`.  Unless otherwise specified, I'll create all project files in there. 


## The screen shot script

### Requirements
* [xwd](http://www.xfree86.org/current/xwd.1.html)
* [ImageMagick](http://www.imagemagick.org/script/index.php)

It's very possible they're already on you system or that your distro provides packages.  Look for the `xwd` and `convert` console commands.

Here's the script, nothing fancy (`screenshot.sh`):

``` bash
    #!/bin/bash
    export DISPLAY=:0.0
    echo 'taking screen shot'
    xwd -root | convert - current.png
```

Make it executable:

``` bash
  $ chmod +x screenshot.sh
```


## The Node.js app

We'll do this in two ways&mdash;using forever-monitor, then built-in Node.js functionality, to spawn the screen shot script.  Both cases will make use of the [node-static](https://github.com/cloudhead/node-static) file server.

### Requirements
* [forever](https://github.com/nodejitsu/forever)
* [forever-monitor](https://github.com/nodejitsu/forever-monitor)
* [node-static](https://github.com/cloudhead/node-static)

`npm` can install all of them:

``` bash
  $ sudo npm install -g forever
  $ sudo npm install -g forever-monitor
  $ sudo npm install -g node-static
```

### Using forever-monitor (`screenshot-fm.js`)

``` js
    // Set path to where you're putting your sources.  No trailing slash!
    var path = '/home/mu/screenshot';
    
    var http = require('http');
    var forever = require('forever-monitor');
    var static = require('node-static');
    var sys = require('sys');
    
    var fileServer = new static.Server(path, { cache: 0, headers: { 'X-TelaSocial': 'hi' } });
    
    http.createServer(function (request, response) {
        request.addListener('end', function () {
            forever.start([ 'bash', path + '/screenshot.sh' ], { max: 1, cwd: path }).on('exit', function () {
                fileServer.serve(request, response, function (err, result) {
                    if (err) { // There was an error serving the file
                        if (request.url != "/favicon.ico") {
                            sys.error("> Error serving " + request.url + " - " + err.message);
                        }
                        // Respond to the client
                        response.writeHead(err.status, err.headers);
                        response.end();
                    } else {
                        sys.puts("> " + request.url + " served successfully");
                    }
                });
            });
        });
    }).listen(8080);
```

**Note:**  Be sure to set the path at the top.


### Using built-in Node.js functionality (`screenshot-n.js`)

``` js
    // Set path to where you're putting your sources.  No trailing slash!
    var path = '/home/mu/screenshot';
    
    var http = require('http');
    var static = require('node-static');
    var spawn = require('child_process').spawn;
    var sys = require('sys');
    
    var fileServer = new static.Server(path, { cache: 0, headers: { 'X-TelaSocial': 'hi' } });
    
    http.createServer(function (request, response) {
        request.addListener('end', function () {
            spawn('bash', [ path + '/screenshot.sh' ], { cwd: path, stdio: 'inherit' }).on('exit', function () {
                fileServer.serve(request, response, function (err, result) {
                    if (err) { // There was an error serving the file
                        if (request.url != "/favicon.ico") {
                            sys.error("> Error serving " + request.url + " - " + err.message);
                        }
                        // Respond to the client
                        response.writeHead(err.status, err.headers);
                        response.end();
                    } else {
                        sys.puts("> " + request.url + " served successfully");
                    }
                });
            });
        });
    }).listen(8080);
```

As you can see, the two versions are almost the same.

**Note:**  Again, don't forget to set the path at the top.


## Running the application

You should now be able to run the application from any directory.  Assuming you've place things in /home/you/screenshot, run from anywhere:

``` bash
  $ node /full/path/to/screenshot-n.js
```

(or `screenshot-fm.js`, as the case may be.)  I recommend not running as root.  Setting up a new, non-privileged user for the sole purpose of running applications like this is probably a good idea, and it helps keep things organized.

Finally, if you want to ensure your app stays running, that's what (regular) `forever` is for.  It will start the application just like `node`, but will bring it back up if it dies and allow you to monitor it:

``` bash
  $ forever /full/path/to/screenshot-fm.js
```

**Note:**  On some systems (at least Debian), you may have to set an environment variable to tell Node.js where its modules are, both in scripts and from the command line:

``` bash
  $ export NODE_PATH:/usr/local/lib/node_modules:$NODE_PATH
```

You should now be able to visit [http://localhost:8080/current.png](http://localhost:8080/current.png), and the image will update every time you revisit.

## Making it work in boot time 

Deleteme - Notice that many scripts end up failing because many developers fail to add right documentation based in real tests. So, for example, when running a nodeapp from /etc/init.d it's important to properly state paths and whatever other requirements. 

Deleteme - As an example, we have understood, in article http://labs.telasocial.com/nodejs-forever-daemon/, that informing --sourceDir is key. I believe that this is going to be the case too since our node app needs to call a script under it's path. 

## References



