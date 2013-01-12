Com o uso de algumas tecnologias novas, como CSS3, desenvolvedores conseguem aliviar o navegador — certas animações, como transição, são feitas pelo engine. Ainda assim, quando tem-se várias animações na página, o desenvolvedor ainda utiliza de JavaScript para inserir regras de estilo. 

## O que o programador fez e faz para animar? 

Ou seja, o programador está governando as regras do "tempo-real" das animações e assim está carregando a responsabilidade de entender os problemas com performance. Assim, é válido entendermos o que os programadores normalmente utilizam — vamos voltar no setTimeout e checar no ponto que estamos e propostas novas. 

##setTimeout para os passos de animação

O setTimeout é bem antigo e foi disponibilizado no Netscape na década de 90. Veja a demonstração <a href='layer.html'>Layer Station</a> para conferir um caso com utilização intensa de setTimeout — demonstração feita em 1997.

A técnica é simples pois o setTimeout permite que você possa chamar uma dada função em JavaScript de forma agendada depois de um certo tempo. Tipo setTimeout("MinhaFuncao()",15); em teoria vai chamar a sua função em 15 milisegundos. Assim programadores conseguem coordenar os passos de animação em relação aos elementos em páginas. O exemplo abaixo é um script que faz a atualização da posição de um elemento: 

    var x = 0; 
    function animar() { 
      document.getElementById('quadrado').style.left=x+"px";
      setTimeout(function () { animar() }, 10); 
    } 

O uso do valor "10" é uma observação importante. Muitos programadores vão colocando valores menores neste "tempo" com o objetivo de deixar suas animações mais rápidas. O problema é que nem sempre o navegador consegue fazer a chamada da função no tempo — no caso 10 milisegundos. E assim existem perdas das chamadas de função. Este agendamento em excesso com perdas não é um caso de boa performance. 

##setTimeout para o "tempo-real"

Outro uso do setTimeout é para coordenar algo no tempo — um agendamento mesmo. O exemplo básico é: 

        function animar_inicio() {
                document.getElementById('quadrado').setAttribute("style","-moz-transition-property: -moz-transform, -moz-transform-origin; -moz-transition-duration:2s;-moz-transform:scale(2.5);");
                setTimeout(function () { animar_fim() }, 2000);  
        }

	function animar_fim() { 
                document.getElementById('quadrado').setAttribute("style","-moz-transition-property: -moz-transform, -moz-transform-origin; -moz-transition-duration:2s;-moz-transform:scale(1);");
                setTimeout(function () { animar_inicio() }, 2000);  
	} 

A demonstração abaixo faz duas inserções de regras de estilo com CSS3 a cada 2 segundos. 

<iframe style="width: 100%; height: 300px" src="http://jsfiddle.net/wpNTk/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

##O problema

O problema é que o programador faz as duas coisas ao mesmo tempo. No segundo caso, setTimeout como agendamento, é um uso razoável mas o programador deve observar que trata-se de um agendamento de chamada de função onde existe uma possibilidade da função não ser chamada e neste caso a programação da animação poderia parar. O caso de ocorrer perdas nas chamadas é evidente quando o usuário coloca um timer pequeno, tipo valor 1. 

##Proposta para performance

Uma das recentes inovações em navegadores ( IE, Firefox e outros ) foi a criação do requestAnimationFrame — experimental em 2012 — veja referências. O requestAnimationFrame é uma função que permite registrar uma função do programador que será chamada no próximo momento que o engine está apto para desenhar. Mas vale notar que dependendo do que você colocar na função, na sua "callback", você estará influenciando o tempo de desenho também. 

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;

    var r  = 0;

    function animar() {
      document.getElementById('quadrado').setAttribute("style","-moz-transform:rotate(-"+r+"deg);");
      r+=.1;
      if(r>=45) {
          requestAnimationFrame(animar);
      }
    } 

    animar();

##Performance com agendamento

É importante observar que no exemplo acima não existe mais agendamento, ou seja, a animação vai perder o aspecto de tempo real. Assim é importante que vc faça seus cálculos com o tempo, que é passado para a sua "callback". No exemplo abaixo ocorre uma operação de transformação, via inserção de regra de estilo, a acada 100 milisegundos.

    var tempo = window.mozAnimationStartTime; 
    function animar(tempo2) {
      if(tempo2-tempo>100) { 
        	  document.getElementById('quadrado').setAttribute("style","-moz-transform:rotate(-"+r+"deg);");
        	  r+=.1;
        	  if(r>=45) {
        	      requestAnimationFrame(animar);
        	  }
        	tempo=tempo2;
      }   
    } 
  
##Referências

<ul>
<li><a href='https://developer.mozilla.org/en-US/demos/detail/taboca-layer-station'>setTimeout oldie demo – Layer Station</a></li>
<li><a href='https://developer.mozilla.org/en-US/docs/DOM/window.mozAnimationStartTime'>mozAnimationStartTime</a></li>
<li><a href='https://developer.mozilla.org/en-US/docs/DOM/window.requestAnimationFrame'>requestAnimationFrame</a>
<li><a href='http://www.w3.org/TR/animation-timing/#requestAnimationFrame'>The WindowAnimationTiming interface</a></li>
</ul>

##Notas do autor: Marcio Galli

Você consegue ver o que está errado neste exemplo acima? ou teve alguma dúvida sobre a questão de tempo real do exemplo? escreva adm em taboca ponto com.

Um tema para a parte 2 é entender o caso onde o programador quer um efeito desejado dentro de um espaço de tempo, tipo rotação de 45 graus no elemento dentro de 1 segundo sendo passos de 5 graus. A questão é que se o navegador não conseguir chamar no momento correto pode acontecer da animação sair errada no final, ou seja, o cálculo dos ângulos tem que estar atrelado a performance assim em um computador lento a ideia seria menos interações. 

