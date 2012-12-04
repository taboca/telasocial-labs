This documentation refers to enterprise WIFI solutions implemented based in various use cases. This article has a bounty program assoiated with it — if you send a valid contribution we will integrate it and provide a compensation: [LabsBounty](https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&searchWords=labs.telasocial.com&minReward=0.00&x=0&y=0) 

## WIFI using 802.1X - contribution from PTI 

This was the chosen solution at PTI, the Technology Park Itaipu in Brazil, with scripts and works contributed by Francisco V. Dantas Jr. A hidden SSID network was made available by the IT group at PTI: SSID broadcasting inhibited and was made available via their Cisco Wireless LAN controllers, thus allowing the WIFI service to be deployed to various spaces at the park. All the telaSocial terminals are Linux boxes and they are to use the hidden SSID and the 802.1X [1] authentication mechanism. 

A Radius [2] server seats behind the controller, identifies the user and deploys the VLAN information dynamically based in prior database information. This means that the actual IP and vlan settings are tied to an user from the server. 

The following information refers to the configuration deployed for each client terminal — it's worth noticing that all computers had Ubuntu 12 with lightdm installed. However, as the wpa_supplicant and interfaces configurations are present, the network manager won't take place for the next reboot. 
  
### /etc/wpa_supplicant.conf

    network={
      ssid="Servicos"
      scan_ssid=1
      key_mgmt=WPA-EAP
      pairwise=CCMP TKIP
      eap=PEAP
      identity="user@srv"
      password="YOUR_PASSWORD_HERE"
      phase1="peaplabel=0"
      phase2="auth=MSCHAPV2"
    }

### /etc/network/interfaces

    auto lo
    iface lo inet loopback
    auto wlan0
    iface wlan0 inet dhcp
    pre-up wpa_supplicant -B -Dnl80211 -i wlan0 -c /etc/wpa_supplicant.conf
    post-down killall -q wpa_supplicant

[1] http://en.wikipedia.org/wiki/IEEE_802.1X 
[2] http://en.wikipedia.org/wiki/RADIUS

