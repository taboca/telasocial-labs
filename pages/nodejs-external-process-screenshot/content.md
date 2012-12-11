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

You should now be able to run the application from any directory.  Assuming you've placed things in /home/you/screenshot, run from anywhere:

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
  $ export NODE_PATH="/usr/local/lib/node_modules:$NODE_PATH"
```

You should now be able to visit [http://localhost:8080/current.png](http://localhost:8080/current.png), and the image will update every time you revisit.


## Daemonizing at system boot with forever

In order to avoid running the server as root, I've split the usual init scripts into two pieces.  The main work is done by a `run.sh` script that goes in the same directory as the rest of the project, and it's run by a normal user.  The system init scripts, run by root, basically just change user and call it.

`run.sh` is the same on all systems:

``` bash
    #!/bin/bash
    
    # Change APP_NAME and APP_DIR.
    APP_NAME="screenshot-n.js"
    APP_DIR="/home/mu/screenshot"
    
    # Change nothing below this line.
    # ------------------------------
    if [[ $EUID -ne 0 ]]
      then
        case "$1" in
          start | stop | restart)
            export PATH="/usr/local/bin:$PATH"
            export NODE_PATH="/usr/local/lib/node_modules:$NODE_PATH"
            pushd "$APP_DIR"
            forever "$1" "$APP_NAME"
            popd
            ;;
          *)
            echo "Usage: $0 {start|stop|restart}" >&2
            exit 1
            ;;
        esac
      else
        echo "Please run as a not-root user."
        exit 1
    fi
    
    exit 0
```

Edit `APP_NAME` and `APP_DIR`, place it with the other files in the project directory and make it executable.

### Debian

``` bash
#!/bin/bash

# Change "Provides" to match the file name (not strictly necessary),
# and Short-Description and Description to whatever you want.

### BEGIN INIT INFO
# Provides:          node_screenshot
# Required-Start:    $all
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: node_screenshot
# Description:       run node_screenshot with forever
### END INIT INFO

# Change this path to wherever you put run.sh, and "mu" to the name of the
# user on the systems who owns and will be running the app.
su -c "/home/mu/screenshot/run.sh $1" mu
```

Copy this into `/etc/init.d`; name it whatever you want and make the edits described in the comments.  Enable it at boot-time with

``` bash
  $ insserv node_screenshot
```

(or whatever you named the file.)  Disable with the `-r` switch.

### Ubuntu

``` bash
# node_screenshot

# Change the description to whatever you like.
description     "node_screenshot"

start on startup
stop on shutdown

# Change this path to wherever you put run.sh, and "mu" to the name of the
# user on the systems who owns and will be running the app.
exec su -c "/home/mu/screenshot/run.sh start" mu
```

Create this script as something like `/etc/init/node_screenshot.conf`, make the change mentioned in the comments and make it executable. 


## References

* [Node.js](http://nodejs.org/)
* [TelaSocial-Mediator](https://github.com/taboca/TelaSocial-Mediator)
* [Node.js app with forever running as a service daemon](http://labs.telasocial.com/nodejs-forever-daemon/)
* [forever](https://github.com/nodejitsu/forever)
* [forever-monitor](https://github.com/nodejitsu/forever-monitor)
* [node-static](https://github.com/cloudhead/node-static)

