Nota técnica de desenvolvimento para desenvolvedores com interesse em JavaScript e NodeJS. O [NodeJS](http://nodejs.org/) é um projeto de infra-estrutura que permite a execução de JavaScript no lado servidor.

## NodeJS com Forever 

Este é baseado no <i>runtime</i> [JavaScript V8](http://code.google.com/p/V8) do Chromee é recomendado para aplicações rápidas e baseadas em eventos, como eventos de rede (http, sockets, etc) ou leitura de disco, etc. 

O Forever é um projeto baseado em NodeJS que permite que uma aplicação NodeJS possa ficar em execução contínua. Existem vários outros projetos que oferecem esta solução ou caso de uso, como por exemplo o [Monit](http://mmonit.com/monit/).  

## Requisitos

<ul>
<li><a href='http://nodejs.org/'>NodeJS</a> Runtime JavaScript baseado no engine do Chrome.</li>
<li><a href='http://npmjs.org/'>npm</a> — gerenciador de pacotes http://npmjs.org/ para NodeJS. </li>
</ul>

## Instalação do Forever

O repositório do Forever, de desenvolvimento, fica em https://github.com/nodejitsu/forever. No entanto, você poderá instalar o Forever utilizando o gerenciador de pacotes do NodeJS, chamado npm: 

    npm install forever

## Testando a execução com Forever

```
var http = require("http");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('testing');
}).listen(80);
console.log('Server running at http://127.0.0.1:80/');
```

Salve o script acima como 'test.js' e faça a execução:

    [sudo] node test.js

Utilize o seu navegador e coloque o endereço 'http://127.0.0.1:80' sendo que o resultado esperado será a palavra 'testing' como a página carregada no seu navegador. Depois disso, e assumindo que você instalou o Forever, então é esperado que você possa executar a linha abaixo: 

    [sudo] forever start test.js

Em caso de funcionamento ele deverá retornar uma mensagem como abaixo:

```
info:   Running action: start
info:   Forever processing file: test.js
```

E para desligar é importante que você utilize o comando 'stop':

    [sudo] forever stop test.js

Que deverá retornar um resultado, no caso do meu exemplo: 

```
info: Running action: stop
info: Forever stopped process:
data: uid  command script  forever pid  logfile uptime       
[0] Bce7 node    test.js 33483   33484 /Users/marciogalli/.forever/Bce7.log 0:0:0:51.143 
```

## Notas:

<ul>
<li>Lembre-se que o forever vai, por default, gerar logs de execução. </li>
<li>Lembre-se que a execução de 'forever test.js' não é a mesma coisa que 'forever start test.js'</li>
</ul>

## Referências: 

<ul>
<li><a href='http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever'>Keep a NodeJS Server Up with Forever</a></li>
<li><a href='http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server'>Web Server simple in NodeJS</a></li>
<li><a href='http://npmjs.org/'>npm</a></li>
<li><a href='https://github.com/nodejitsu/forever'>NodeJitsu Forever</a></li>
<li><a href='http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever'>Keep a NodeJS Server Up with Forever</a></li>
</ul>

## Referências da Documentação

<ul>
<li>Projeto parte documentação: TelaSocial Mediator, projeto originalmente elaborado durante o Latinoware em 2011. Agradecimentos para PTI ( Parque Técnológico de Itaipú ) e <a href='https://github.com/netoarmando'>Armando Neto</a></li>
</ul>


