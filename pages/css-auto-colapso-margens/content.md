Visão geral sobre o tema *colapso* de margens em CSS ou [Collapsing Margins](http://www.w3.org/TR/CSS21/box.html#collapsing-margins) que é parte da especificação CSS 2.1

## Introdução

A especificação CSS diz que existem casos onde as margens de elementos que estão *colados* devem entrar em colapso, ou seja, deverão se tornar uma única margem. O efeito as vezes é confuso porque não é o intuitivamente esperado por desenvolvedores. Vejamos o exemplo abaixo: 

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

## Casos que margin collapsing é desligado


## Nota do autor e observação sobre elementos transformados via CSS

Obrigado para Boris da Mozilla pela explicação (meu [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=809208) ficou inválido) sobre o efeito que o Gecko faz em desligar o margin collapse para elementos transformados. 

## Referências

* [Margin Collapsing MDN](https://developer.mozilla.org/en-US/docs/CSS/margin_collapsing)
* [W3C Collapsing Margins](http://www.w3.org/TR/CSS21/box.html#collapsing-margins)


