#!/bin/bash
# File: install.sh
# Author: Brian E. Moore, PE
# Beaglebone Server install script
# installs scripts and required files onto beaglebone - angstrom distro)

# Creation Date: 12-24-2014

WARNING="FALSE"
# This production install is about installing the evolving project image
# all of client and dependencies are under app already expanded. bower and npm packages
# are already expanded in the directory image.

SRC_DIR="C:/Users/Brian/beaglebone"
TARG_DIR="/usr/local/mechMon"

IP_ADDR="192.168.7.2"

echo "Create install directory on target..."
ssh root@${IP_ADDR} 'mkdir /usr/local/mechMon'

echo "Set umask on target..."
ssh root@${IP_ADDR} 'mkdir /usr/local/mechMon'


# this is main part of application
echo "Copy ROOT_DIR/app to target"
#rsync will preserver permissions (-a archive mode -r is recursive)and is therefore a much better method than scp
scp -r ${SRC_DIR}/app  root@${IP_ADDR}:${TARG_DIR}

echo "Install mechMon.service on target"
scp ${SRC_DIR}/mechMon.service root@${IP_ADDR}:/etc/systemd/system
ssh root@{$IP_ADDR} 'systemctl enable  mechMon.service'

echo "Copy server.js to target..."
scp ./*.* root@$IP_ADDR:/$DEST_DIR

#echo "Executing build.sh on beaglebone..."
#ssh root@$IP_ADDR '/usr/local/build.sh'

echo "Installing ssh private key to communicate with company cloud server..."
scp ./server1.pem root@$IP_ADDR:~/.ssh

