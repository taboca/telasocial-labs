Este artigo é uma nota técnica com a solução Web para fazer rotação de 90 graus em aplicações Web, que é uma solução para rodar a aplicação em painéis como TVs na vertical.

## Desafio Girar o monitor via Web 

O projeto consiste no desenvolvimento de uma aplicação tipo web app, inicialmente com foco e funcionalidade para dispositivos móveis, que é otimizada para TVs que estão configuradas na forma vertical. Tal orientação é as vezes referida como CCW ( counter clock wise ), 90 graus para a esquerda ou CW que é 90 graus para a direita. Alguns celulares ou tablets possuem saída para TV. Estes aparelhos, quando ligados na TV, são otimizados para apresentar a imagem do celular dentro da TV assumindo-se a orientação horizontal. Mesmo no caso onde o usuário decide girar o celular, ou seja, o formato vertical, ainda assim uma imagem pequena "vertical" aparece na TV dentro do quadro-espaçø horizontal da TV. Tal cenário é um problema em casos onde o interesse é apresentação de conteúdo elaborado para a orientação vertical. Esta necessidade não é comum mas é um caso de uso para instalações em ambientes públicos ou semi-públicos. Com base neste cenário alguns requisitos são listados abaixo: 

## Requisitos

* Aplicação tipo Página de Web;

* JavaScript ou CSS que tem operação dinâmica, ou seja, 
  design fluido onde a imagem é calculada em função 
  do tamanho da tela. 

* Aplicação faz efeito de rotação do conteúdo web por meio
  de transformações ( CSS transform ) assim permitindo que
  o conteúdo possa girar em 90 graus tanto para a direita 
  como para a esquerda. 

* Aplicação exemplo, Twitter, deverá ser o caso de uso. 

* Arquivo webapp.manifest deverá ser elaborado permitindo 
  que a aplicação possa ser disponível como web app para
  dispositivos como o FirefoxOS. 

