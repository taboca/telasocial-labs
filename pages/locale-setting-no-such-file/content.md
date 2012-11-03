This technote addresses how I have solved locale problems with my remote Ubuntu machine and client access from a Mac OS X Mountain Lion. 

## Problem shown in the remote Ubuntu
 
    locale: Cannot set LC_CTYPE to default locale: No such file or directory

If you suddently see your Ubuntu with a locale setting problem then you may wish to verify the ssh environment from the machine you are coming from. My case is that a remote Ubuntu server suddenly showed an error like the following: 

It turns out my problem was that I have replaced my Mac OS so the locale setting in my client environment was not set. If you have the same problem you may try to add the following lines to your ~username/.bash_profile in your Mac OS X: 

    export LANG="en_US.utf8"
    export LANGUAGE="en_US.utf8"
    export LC_ALL="en_US.utf8"

It's worth to mention that you may also be able to enforce the locale settings in your Ubuntu machine so it won't depend on ssh clients connecting. See the refernece for how to do that. 

##Referências 

<ul>
<li><a href='http://askubuntu.com/questions/33025/locale-settings-are-not-right-how-can-i-reset-them'>Locale settings are not right</a></li>
</ul>

