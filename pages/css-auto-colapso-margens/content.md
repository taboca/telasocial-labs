Visão geral sobre o tema de margens que entram em colapso em CSS ou [Collapsing Margins](http://www.w3.org/TR/CSS21/box.html#collapsing-margins) que é parte da especificação CSS.

## Introdução

A especificação CSS diz se elementos que estão *colados*, adjacentes, uma dessas margens "coladas" deverão se tornar zero, causando o efeito de uma só margem. O efeito só se aplica para: 

* Margens verticais dos elementos (não é para margens horizontais)
* Elementos que não são float ou com posicionamento absoluto ou inline-block
* Elementos que tem o overflow diferente de 'visible' 
* Elementos que não foram limpados (com atributo 'clear')
* Elemento raiz

O efeito as vezes é confuso porque não é o intuitivamente esperado por desenvolvedores. Vejamos o exemplo abaixo: 

    <h1>Título</h1>
    <p>Texto uga munga belonga.</p>

Que tem as regras de estilo: 

    h1 { margin:20px } 
    p  { margin:25px } 

O efeito gerado visual será: 

    +-------------------------+
    | Título                  |
    +-------------------------+
       /\ 
       || 25 pixels 
       \/
    +-------------------------+
    | Texto uga munda belonga |
    +-------------------------+

Observe que a margem que prevalesce é a do maior elemento. 

## Caso de margens negativas, vale a somatória

    h1 { margin:20px } 
    p  { margin:-20px } 

O efeito gerado visual será: 

    +-------------------------+
    | Título                  |
    +-------------------------+
       /\ 
       || 0 pixels 
       \/
    +-------------------------+
    | Texto uga munda belonga |
    +-------------------------+

* Ainda vale lembrar que se ambas as margens forem negativas então não mais vale a somatória — daí o maior valor é utilizado. 

## Caso de elementos aninhados (nested) 

A imagem abaixo mostra um exemplo do lado esquerdo e outro do lado direito. 

<img src='image.png' />

Nos dois casos a estrutura do markup é a mesma: 

    +---------------+
    | h1 - Caso 1   | 
    +---------------+ 
    +---------------------+  --> div pai do "p" com "texto interno.."
    |  +---------------+  | 
    |  | Texto interno |  | 
    |  +---------------+  | 
    +---------------------+ 
 
E existe este DIV que tem um parágrafo "p" aninhado, ou seja, dentro dele. Na regra de estilo temos margens aplicadas aos elementos h1 e p e não temos margens aplicadas ao elemento div. 

Neste caso é importante observamos os seguintes pontos: 

### O efeito ocorre com elementos aninhados 

Assim o DIV e o P vão ter suas margens em colapso, ou seja, sendo que P tem margem e o DIV não tem, vai ocorrer que a margen em colapso será o valor de P simplesmente por ter sido o maior. 

### Elemento aninhado é adjacente do H1

Depois que a operação acima é verdadeira, então é ainda verdadeiro que entre o elemento com aninhados ( Div e P ) e o H1 o efeito de colapso de margem também ocorrerá, ou seja, deveremos ver uma distância total entre H1 e P de exatamente o valor da maior margem entre H1, DIV e P. 

### Caso 2, inserção de padding no DIV faz efeito não mais se aplicar

Na imagem acima, o caso 2, mostra que as margens passam a existir porque o efeito foi desligado ao se colocar padding. Abaixo veremos mais casos onde o margin collapsing passa a não mais se aplicar. Veja o exemplo: <a href='./exemplo1/index.html'>exemplo</a>.

## Casos que margin collapsing é desligado

Em outro caso, <a href='./exemplo2/index.html'>exemplo 2</a> foi colocado o atributo padding no DIV mas este tem agora uma margem de 100 pixels. Neste caso, sendo o p com margem 60 e o DIV com 100, a margem total fica sendo 160. 

Existem outros casos onde é possível remover o efeito de margens em colapso: 

* 

## Nota do autor e observação sobre elementos transformados via CSS

Obrigado para Boris da Mozilla pela explicação (meu [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=809208) ficou inválido) sobre o efeito que o Gecko faz em desligar o margin collapse para elementos transformados. 

## Referências

* [Sitepoint Collapsing Margins](http://reference.sitepoint.com/css/collapsingmargins)
* [W3C Collapsing Margins](http://www.w3.org/TR/CSS21/box.html#collapsing-margins)
* [Margin Collapsing MDN](https://developer.mozilla.org/en-US/docs/CSS/margin_collapsing)


