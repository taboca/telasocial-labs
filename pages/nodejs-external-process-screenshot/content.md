This technote describes a bare-bones Node.js application that launches a shell script that takes screenshots using [xwd](http://www.xfree86.org/current/xwd.1.html). The application will simply serve a PNG image of the server's desktop as it appears at the current time.

## Introduction

There are four basic parts to the application:

* A simple Node.js webserver using [node-static](https://github.com/cloudhead/node-static).
* A method of launching the external process.  Two possibilities will be discussed.
* The screenshot script (i.e., the external process to be run.)
* Setting the application up to start at boot time.

## A simple Node.js webserver

[node-static](https://github.com/cloudhead/node-static) can be installed via npm:

    npm install -g node-static.

Then create your main Node.js script:

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


Notice we pass the *request* to the static.Serve, file.serve(req, this will make this server attempt to serve anything that the user enters. So, for example, if the user types

    http://localhost:8888/static/image.png

You will need to place an image in the ./static directory under this application relative path. 

## Calling an external process


### Using standard NodeJS approach


### Using Forever 

In this section we will show how to use Forever API to launch a process. Notice forever has options that are different from the standard way of launching a process with NodeJS.

    https://github.com/taboca/TelaSocial-Mediator/blob/master/mediator.js#L278-L287

#### Requirements npm install forever 

## Screenshot script

In this section we will need to cover the notes so that the developer user can actually get xwd working — required installations with Debian and so on. 

    https://github.com/taboca/TelaSocial-Mediator/blob/master/scripts/screenshots/index.sh

## Making it work in boot time 

Deleteme - Notice that many scripts end up failing because many developers fail to add right documentation based in real tests. So, for example, when running a nodeapp from /etc/init.d it's important to properly state paths and whatever other requirements. 

Deleteme - As an example, we have understood, in article http://labs.telasocial.com/nodejs-forever-daemon/, that informing --sourceDir is key. I believe that this is going to be the case too since our node app needs to call a script under it's path. 

## References



