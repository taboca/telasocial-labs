Esta é uma demonstração que mostra como criar uma tag de vídeo que tem um efeito tipo "máscara" em cima do vídeo — letras de fogo.

## Geral da implementação

São duas camadas — a primeira, do fundo, tem simplesmente a tag de vídeo. A segunda é um canvas. Neste canvas tem um texto desenhado onde a parte do texto é desenhada com RGBA (alpha) com transparência máxima, ou seja, é um plano escuro onde o texto é transparente. 

## Demonstração (para Firefox)

[Confira a demonstração](video-mask)

## Notas do autor

Se você quiser portar esta demonstração para outros navegadores por favar envie seu patch para este artigo e demonstração. 

## Referências

* [Public Videos](http://alpha.publicvideos.org)
* [MDN Canvas tag](https://developer.mozilla.org/en-US/docs/HTML/Canvas) 
* [Using HTML5 Audio and Video](https://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video)



