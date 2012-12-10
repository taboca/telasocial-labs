This technote describes a bare-bones Node.js application that launches a shell script that takes screenshots using [xwd](http://www.xfree86.org/current/xwd.1.html). The application will simply serve a PNG image of the server's desktop as it appears at the current time.


## Introduction

There are four basic parts to the application:

* A simple Node.js webserver using [node-static](https://github.com/cloudhead/node-static).
* The screenshot script (i.e., the external process to be run.)
* A method of launching the external process.  Two possibilities will be discussed.
* Setting the application up to start at boot time.


## A simple Node.js webserver (`screenshot.js`)

[node-static](https://github.com/cloudhead/node-static) can be installed via npm:

``` bash
  $ sudo npm install -g node-static.
```

Then create your main Node.js script:

``` js
    var static = require('node-static');
    var http = require('http');
    var sys = require('sys');

    var fileServer = new static.Server('./', { cache: 0, headers: { 'X-TelaSocial': 'hi' } });

    http.createServer(function (request, response) {
        request.addListener('end', function () {
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
    }).listen(8080);
```

**Note:** The script, as written, will attempt to serve anything the user requests in the request part of the URL; everything after the hostname and port will be mapped directly to directories and file names.

For instance, the URL

    http://localhost:8080/stuff/image.png

requires the directory `stuff` containing `image.png` to be in the same directory as the `screenshot.js`. This can be customized by changing the line

``` js
    var fileServer = new static.Server('./', { cache: 0, headers: { 'X-TelaSocial': 'hi' } });
```

to something like

``` js
    var fileServer = new static.Server('/some/other/path', { cache: 0, headers: { 'X-TelaSocial': 'hi' } });
```

## The screenshot script (`screenshot.sh`)

This is the easiest part.  It requires [xwd](http://www.xfree86.org/current/xwd.1.html) and [ImageMagick](http://www.imagemagick.org/script/index.php) to be installed on your system.  Both are almost certainly available as packages for you distribution.  Here's the script; save it and make it executable in the same place as `screenshot.js`:

``` bash
    #!/bin/bash
    export DISPLAY=:0.0
    xwd -root | convert - current.png
```

## Launching the external process

### Using builtin Node.js

### Using Forever 

For this case, we'll use forever to run [TelaSocial Mediator](https://github.com/taboca/TelaSocial-Mediator), which will in turn fetch and cache the image, keeping it up-to-date for `screenshot.js`.  Make sure you have a few things:

``` bash
  $ sudo npm install -g forever
  $ sudo npm install -g xml2js
  $ sudo npm install -g ftp-server
```

Download or clone Mediator.  If you have git, it's probably easiest to _cd_ into the directory with _screenshot.js_ and do:

``` bash
  $ git clone https://github.com/taboca/TelaSocial-Mediator
```



## Making it work in boot time 

Deleteme - Notice that many scripts end up failing because many developers fail to add right documentation based in real tests. So, for example, when running a nodeapp from /etc/init.d it's important to properly state paths and whatever other requirements. 

Deleteme - As an example, we have understood, in article http://labs.telasocial.com/nodejs-forever-daemon/, that informing --sourceDir is key. I believe that this is going to be the case too since our node app needs to call a script under it's path. 

## References



