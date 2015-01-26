#!/bin/bash
# File: install.sh
# Author: Brian E. Moore, PE
# Beaglebone Server install script
# installs scripts and required files onto beaglebone -debian  distro)

# Creation Date: 12-24-2014
# Revised  Date: 01-20-2014

WARNING="FALSE"
# Assumptions: Target BBB has a new eMMc flash image.
# USB connection is used over default 192.168.7.2
# We must set temporary gateway and dns for install
# If you have been using ssh to log into multiple BBB's, you will have to
# remove offending key with command like: sed -i '6d' ~/.ssh/known_hosts where '6' is line number
#
## all of client and dependencies are under app already expanded. bower and npm packages
# are already expanded in the directory image.
# rsync source path not working correct in cygwin - Im getting sick of cygwin's problems
# we should move all of this to linux virtual machine - ( or a BBB)
SRC_DIR="./"
#"cygdrive/c/Users/beaglebone"
TARG_DIR="/usr/local/mechMon"

# These are all just temporary
IP_ADDR="192.168.1.139"

# manual settings for wired ethernet
# give target temporary gateway and DNS...
#ssh root@${IP_ADDR} '/sbin/route add default gw 192.168.7.1'
#ssh root@${IP_ADDR} 'cat "nameserver 8.8.8.8" >> /etc/resolv.conf'

echo "Create install directory on target..."
ssh root@${IP_ADDR} 'mkdir /usr/local/mechMon'

echo "Set umask on target..."
ssh root@${IP_ADDR} 'umask 002'

# this is main part of application
echo "Copy ROOT_DIR/app to target"
#rsync will preserver permissions (-a archive mode -r is recursive)and is therefore a much better method than scp
rsync -avhz ${SRC_DIR}/app  root@${IP_ADDR}:${TARG_DIR}

# node_modules also required
rsync -avhz ${SRC_DIR}/node_modules root@${IP_ADDR}:${TARG_DIR}

# don't install cape file - not used with bonescript!!
#install firmware (cape) driver(s) *.dtbo files
# rsync -avhz ${SRC_DIR}/*.dtbo  root@${IP_ADDR}:/lib/firmware

echo "Install mechMon.service on target"
rsync -avhz ${SRC_DIR}/mechMon.service root@${IP_ADDR}:/etc/systemd/system
ssh root@${IP_ADDR} 'systemctl enable  mechMon.service'
shut
# we will disable beaglebone demo stuff by turnoff autorun.js and bonescript services
# have to turn off service now
# have to mark its service unit file as restart= no
# Still there, just inactive

echo "Copy server.js to target..."
rsync -avhz ${SRC_DIR}/server.js root@${IP_ADDR}:/${TARG_DIR}

ssh root@192.168.1.136 ' bash -s' < wireless_script.sh
#awk '/#WiFi Example*/{print;print "allow-hotplug ra0 \nface ra0 inet dhcp # inserted by script";next}1' \
#    /etc/network/interfaces > ./tmp1 && mv ./tmp1 /etc/network/interfaces
echo "configure /etc/network/interfaces.."

echo "Installing ssh private key to communicate with company cloud server..."
scp ./server1.pem root@${IP_ADDR}:~/.ssh
# we will push MAC address of this BBB also up to company server DB
