Esta é uma nota técnica com o estado de desenvolvimento do suporte iCalendar no projeto telaSocial e a criação de uma aplicação Web que faz o parsing e apresentação de elementos tipo grade de eventos. 

##Suporte formato iCalendar em aplicações de apresentação de eventos

O vídeo abaixo mostra a primeira versão, experimentação com o telaSocial, que mostra o suporte iCalendar. O padrão iCalendar é popular em aplicações tipo Google Calendar e também outras. O suporte iCal permite que o sistema telaSocial possa apresentar informações relevantes aos eventos. Uma das novidades é que o sistema de grade visual pode também adequar várias salas ao mesmo tempo, ou seja, se você tem um evento que tem palestras simultâneas em salas diferentes, o layout irá automaticamente arranjar os elementos na tela. 

<iframe src="http://player.vimeo.com/video/48331744" width="780" height="488" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <a href="http://vimeo.com/48331744">[t8l] Suporte Ical Experimental no TelaSocial</a> from <a href="http://vimeo.com/t8l">telasocial</a> on <a href="http://vimeo.com">Vimeo</a>.

O suporte inicial no telaSocial saiu graças a algumas interações via projetos e contribuidores. Obrigado para Cezar Piraja ( lapsi @ latinwoare ) e Maurício Araldi de Passo Fundo. Este projeto foi avançado durante o desenvolvimento de projetos com o Parque Tecnológico Itaipu em 2012. O código fonte do elemento grade pode ser encontrado aqui <a href='https://github.com/taboca/TelaSocial/tree/master/apps/base/grid-calendar'>Github TelaSocial Grid Calendar</a>.

##Referências

<ul>
<li><a href='http://www.ietf.org/rfc/rfc2445.txt'>RFC 2445 Icalendar</a></li>
<li><a href='/p/d/grid-layout'>Grid Type API for Grid layout based in string specification</a></li>
</ul>

