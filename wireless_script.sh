#!/bin/bash
# File: wireless_script.sh
# Author: Brian E. Moore, PE
# Date:01-20-2014

# Note: to be executed on target via ssh, i.e. ssh root@192.168.1.136 '${TARG_DIR}/wireless_script.sh'
/usr/bin/awk '/# WiFi Example*/{print;print "allow-hotplug ra0 \nface ra0 inet dhcp # inserted by MTS script";next}1' \
    /etc/network/interfaces > /usr/local/mechMon/tmp1 && mv /usr/local/mechMon/tmp1 /etc/network/interfaces
