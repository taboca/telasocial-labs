This is a technote with the solution to put the monitor in CW or CCW mode using a newernVidia-powered graphics card and its linux driver which is X compatible. Notice that nVidia driver is not open source at this version. 

##Configuring nvidia rotation with X

Using a newer nVidia driver, such as the version 302.17 [1], you may need to change the configuration in the xorg.conf file. Attributes such as Option "Rotate" and Option "RandRRotation" won't work anymore — check their [1] release notes. Now you will need to use the Option "metamodes" attribute under the Screen section — see the following example: 

    Section "Screen" 
      Option "metamodes" "VGA-0: nvidia-auto-select {Rotation=left}"
    EndSection

It's always goot to check your X log files under /var/log/Xorg.0.log

##References

<ul>
<li><a href='http://www.nvidia.com/object/linux-display-ia32-302.17-driver.html'>301.17 nVidia Linux Release notes</a></li>
<li><a href='https://github.com/taboca/TelaSocial/issues/31'>TelaSocial bug 32 — Option Rotate fails</a></li>
</ul>

