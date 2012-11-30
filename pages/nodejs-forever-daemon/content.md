This is  development technote and it explains how to setup forever for NodeJS and to make it a daemon — so to have it call your NodeJS application when your linux server is restarted. 

THIS TECHNOTE IS UNDER CONTRIBUTION MODE — IT"S OPEN TO DEVELOPERS AND IT HAS A BOUNTY PROGRAM – the bounty prize and contribution statement of work is hosted at the [mechanical turk developers account]() 

NodeJS is based in the [JavaScript V8](http://code.google.com/p/V8) from Chrome and it's good for a range of kinds of applications and it brings JavaScript to the server. Applications written with NodeJS will be event driver. As an example, if you want to create a file, you dispatch a call and later a callback function will be called so that's how you know the file was created. This is a good model so your app won't be stuck and waiting for execution of events.

## NodeJS install requirements 

<ul>
<li><a href='http://nodejs.org/'>NodeJS</a> Runtime.</li>
<li><a href='http://npmjs.org/'>npm</a> – the package manager </li>
</ul>

## Installing Forever 

Forever is made by nodejitsu — https://github.com/nodejitsu/forever. Forever has functions to help you create an application that is always running — forever running. When the code dies, forever will bring back. It has built in functionality that monitors and process and it also offers an API so you use some of the features also from your code. 

However you can install using the npm package manager. 

    npm install forever

## Testing your sample app 

```
var http = require("http");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('testing');
}).listen(80);
console.log('Server running at http://127.0.0.1:80/');
```

    [sudo] node test.js

Point your browser to you localhost 'http://127.0.0.1:80' and expect to see 'testing'. After that, you should be able to use Forever executable application to load your application:

    [sudo] forever start test.js

It should give something like the following: 

```
info:   Running action: start
info:   Forever processing file: test.js
```

If you want to stop then use the following: 

    [sudo] forever stop test.js

Which returns something like: 

```
info: Running action: stop
info: Forever stopped process:
data: uid  command script  forever pid  logfile uptime       
[0] Bce7 node    test.js 33483   33484 /Users/marciogalli/.forever/Bce7.log 0:0:0:51.143 
```

## Notes about logs and system messages

Forever will keep the logs and system stdout and error messages in a file that is associated with your process. Look for a ".forever" hidden directory under the user which you have Forever installed. 

## More to come 

### How to make your "forever app" to be launched in boot time using the /etc/init.d in your Linux. 

## References

<ul>
<li><a href='http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever'>Keep a NodeJS Server Up with Forever</a></li>
<li><a href='http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server'>Web Server simple in NodeJS</a></li>
<li><a href='http://npmjs.org/'>npm</a></li>
<li><a href='https://github.com/nodejitsu/forever'>NodeJitsu Forever</a></li>
<li><a href='http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever'>Keep a NodeJS Server Up with Forever</a></li>
</ul>



