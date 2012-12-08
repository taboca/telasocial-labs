This technote shows a NodeJS application that launches a separated shell script that takes screenshots using xwd tool. Our use case it's a system that can take screenshots and can serve the PNG image to an end user. This is not a full-feature screen control solution — it's a simple http fetch X screenshot app. 

## Introduction

## NodeJS simple web server

### require requirements

    https://github.com/taboca/TelaSocial-Mediator/blob/master/mediator.js#L49-L51

    // Using CloudHead node static 
    // https://github.com/cloudhead/node-static
    // var file = new(static.Server)('.', { cache: 7200, headers: {'X-Hello':'World!'} });

    var file = new(static.Server)('.', { cache: 00, headers: {'X-TelaSocial':'hi'} });

    http.createServer(function (req, res) {

      req.addListener('end', function () {
        file.serve(req, res, function (err, res) {
            if (err) { 
                sys.error("> Error serving " + req.url + " - " + err.message);
                response.writeHead(err.status, err.headers);
                response.end();
            } else { // The file was served successfully
                sys.puts("> " + req.url + " - " + res.message);
            }
        });
      });

    }).listen(8888);

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



