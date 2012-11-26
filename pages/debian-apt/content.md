If you have problems installing git you may need to check your /apt/sources.list with modification to default Debian sources.

## Edit your /etc/apt-sources.list

Make sure you have *squeeze*. In some systems you may get simply squeeze-updates. If this is your case, please add the following line: 

    deb http://ftp.debian.org/debian/ squeeze main contrib non-free

Then update

    apt-get update 

## Installing git

Git was once "git-core" and it is not simply git. 

    apt-get install git



