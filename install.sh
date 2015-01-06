#!/bin/bash
# File: install.sh
# Author: Brian E. Moore, PE
# Beaglebone Server install script
# installs scripts and required files onto beaglebone - angstrom distro)

# Creation Date: 12-24-2014

WARNING="FALSE"

LAUNCH_DIR="C:/Users/Brian/beaglebone/beaglebone_CBBRelay"
DEST_DIR="/usr/local/mechMon"

IP_ADDR="192.168.7.2"

echo "Creating install directory on beaglebone..."
ssh root@$IP_ADDR 'mkdir /usr/local/mechMon'

echo "Copy build.sh to beaglebone..."
scp ./build.sh root@$IP_ADDR:/home/root

echo "Copy startup.sh to beaglebone..."
scp ./startup.sh root@$IP_ADDR:/home/root
echo "Copy shutdown.sh to beaglebone..."
scp ./shutdown.sh root@$IP_ADDR:/home/root


echo "Copying directory to beaglebone..."
scp ./*.* root@$IP_ADDR:/$DEST_DIR


echo "Executing build.sh on beaglebone..."
ssh root@$IP_ADDR '/usr/local/build.sh'


echo "Installing ssh private key to communicate with company cloud server..."
scp ./server1.pem root@$IP_ADDR:~/.ssh

echo "Installing systemd unit file in /etc/systemd/system..."
scp ./mechMon.service root@$IP_ADDR:~/etc/systemd/system