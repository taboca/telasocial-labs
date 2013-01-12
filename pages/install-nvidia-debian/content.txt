This case refers to nvidia proprietary driver that needs to be downloaded from the NVidia web site and may require some infra-structure in the Linux in order to work. 

## Download 

The link to the download, and agreements page is

    http://www.nvidia.com/object/linux-display-ia32-295.40-driver.html 

### Requirements 

    apt-get update 

In this case we were using 2.6.32 so you may be required to do changes in your system – check your version with uname -r. 

    apt-get install binutils
    apt-get install linux-source-2.6.32
    apt-get install linux-headers-2.6.32-5-686

With Ubuntu 12 and uname -r = 3.0.0-12-generic so the files are 
 
    apt-get install linux-source-3.0.0
    apt-get install linux-headers-3.0.0-12-generic

### Run nvidia binary

./NVIDIA-Linux-x86-295.40.run 

### Case 

#### Option Rotate is not used 

    http://forums.opensuse.org/english/get-technical-help-here/hardware/479822-nvidia-driver-304-43-ignoring-rotate-xorg-conf-post2498521.html

## More

* (Nvidia Rotation)[http://labs.telasocial.com/metamodes-rotation-nvidia/]
