#!/bin/bash
# File: build.sh
# Author: Brian E. Moore, PE 
# Beaglebone Server provisioning build script 
# configures and download dependancies not found on angstrom distro
# to run once
# Creation Date: 12-24-2014

WARNING="FALSE"

USER='ubuntu'
# Note: this script will start as user root, and has to be located
# in /usr/local/mechMon

INSTALL_DIR="/usr/local/mechMon"
mkdir $INSTALL_DIR
cd $INSTALL_DIR

WDIR=$(pwd)
##### This is important- one reason is so that script can scp files
sudo chown -R $USER:$USER $INSTALL_DIR
sudo chmod u=rwx,g=rwx,o=rwx $INSTALL_DIR
umask 002

# if no DHCP service, we must assign the gateway and DNS server address...
#sudo /sbin/route add default gw 192.168.7.1
#cat 'nameserver 8.8.8.8' >> /etc/resolv.conf

# Note: logs and other 'remnants' may be left over from launching image...
LOGDIR=$INSTALL_DIR'/log'
if [ ! -d "$LOGDIR" ]; then
  mkdir $LOGDIR
fi
sudo chown -R $USER:$USER $LOGDIR
sudo chmod u=rwx,g=rxx,o=rwx $LOGDIR

if [ -f "$LOGDIR/build.log" ]; then
  sudo rm $LOGDIR/build.log
  touch $LOGDIR/build.log
  sudo chmod u=rwx,g=rxx,o=rwx $LOGDIR/build.log
  sudo chown -R vagrant:vagrant $LOGDIR/build.log
else
  echo $(date +%FT%T%z) "$LOGDIR/build.log already exists... " | tee -a $LOGDIR/build.log
fi
if [ -f "$LOGDIR/access.log" ]; then
  sudo rm $LOGDIR/access.log
  touch $LOGDIR/access.log
  sudo chmod u=rwx,g=rxx,o=rwx $LOGDIR/access.log
  sudo chown -R vagrant:vagrant $LOGDIR/access.log
else
  echo $(date +%FT%T%z) "$LOGDIR/access.log already exists... " | tee -a $LOGDIR/build.log
fi

sudo ln -sf /usr/share/zoneinfo/America/Chicago /etc/localtime
TIMESTAMP=$(date +%FT%T%z)

APP_ARCHIVE_FILE=$LOGDIR'/build.'$TIMESTAMP'.log'

cd $WDIR
echo $(date +%FT%T%z) "Author: Brian E. Moore, PE " | tee -a $LOGDIR/build.log 
echo $(date +%FT%T%z) "Development build... " | tee -a $LOGDIR/build.log
echo $(date +%FT%T%z) "- starting dev build script (build.sh) ..." | tee -a $LOGDIR/build.log

echo $(date +%FT%T%z) 'run opkg update - can take several minutes... ' $PKG_OK | tee -a $LOGDIR/build.log
#sudo apt-get update

#sudo opkg update
#sudo opkg upgrade
#get ip addresses and mask of first two network cards
IP_ADDR0=$(ifconfig eth0 | grep 'inet addr'| cut -d':' -f2| cut -d' ' -f1)
MASK0=$(ifconfig eth0 | grep 'inet addr'| cut -d':' -f4)
IP_ADDR1=$(ifconfig usb0 | grep 'inet addr'| cut -d':' -f2| cut -d' ' -f1)
MASK1=$(ifconfig usb0 | grep 'inet addr'| cut -d':' -f4)
export IP_ADDR0; export IP_ADDR1; export MASK0; export MASK1
echo $(date +%FT%T%z) 'IP_ADDR0: ' $IP_ADDR0 ' MASK0: ' $MASK0  | tee -a $LOGDIR/build.log
echo $(date +%FT%T%z) 'IP_ADDR1: ' $IP_ADDR1 ' MASK1: ' $MASK1| tee -a $LOGDIR/build.log

PKG_VER=$(dpkg-query -s nodejs|grep "Version:")
echo $(date +%FT%T%z) 'nodejs version installed: ' $PKG_VER | tee -a $LOGDIR/build.log

########### npm command installation
echo $(date +%FT%T%z) "Checking/Installing npm..." | tee -a $LOGDIR/build.log
sudo apt-get --force-yes --yes install npm
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' npm|grep "install ok installed")
if [ "" == "$PKG_OK" ]; then
  echo $(date +%FT%T%z) "Installation of npm failed. Exiting script" | tee -a $LOGDIR/build.log
  WARNING="TRUE"
  exit
else 
  echo $(date +%FT%T%z) "Installation of npm successful..." | tee -a $LOGDIR/build.log
  PKG_VER=$(dpkg-query -s npm|grep "Version:")
  echo $(date +%FT%T%z) 'npm version installed: ' $PKG_VER | tee -a $LOGDIR/build.log
fi
############# install git - its required by bower for some fetches
echo $(date +%FT%T%z) 'Checking/Installing git...'
sudo apt-get --force-yes --yes install git
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' git|grep "install ok installed")
if [ "" == "$PKG_OK" ]; then
  echo  $(date +%FT%T%z) "Installation of git failed..."| tee -a $LOGDIR/build.log
  WARNING="TRUE"
else
 echo $(date +%FT%T%z) "Installation of git successful..." | tee -a $LOGDIR/build.log    
 PKG_VER=$(dpkg-query -s git|grep "Version:")
 echo $(date +%FT%T%z) 'git version installed: ' $PKG_VER | tee -a $LOGDIR/build.log
fi

# link required because bower uses "node" not "nodejs" as executable name 
echo $(date +%FT%T%z) "Installing link from /usr/bin/nodejs /usr/bin/node" | tee -a $LOGDIR/build.log
sudo ln -s /usr/bin/nodejs /usr/bin/node

#############  grunt-cli installation - (Very much required for bootstrap)
# grunt says not to install it (grunt exec)globally so now in package.json devdependancies
# grunt-cli IS to be installed globally...
echo $(date +%FT%T%z) "Install grunt-cli (globally)" | tee -a $LOGDIR/build.log
sudo npm install -g grunt-cli 
PKG_OK=$(grunt --version|grep "grunt-cli")
PKG_VER=$(grunt --version)
echo $(date +%FT%T%z) 'Verifying installation of bower: ' $PKG_OK | tee -a $LOGDIR/build.log
if ![[ "*grunt_cli*" == "$PKG_OK" ]]; then
  echo -e $(date +%FT%T%z) "$COL_RED Installation of bower failed. $COL_RESET" | tee -a $LOGDIR/build.log
  WARNING="TRUE"
else 
  echo $(date +%FT%T%z) "Installation of grunt-cli confirmed..." | tee -a $LOGDIR/build.log  
  echo $(date +%FT%T%z) 'grunt-cli version installed: ' $PKG_VER | tee -a $LOGDIR/build.log
fi

#############  grunt- (proper)installation 
#grunt moved from package.json to explicit install here due to problems
echo $(date +%FT%T%z) "Install grunt proper (locally)" | tee -a $LOGDIR/build.log
sudo npm install grunt

#############  bower installation 
echo $(date +%FT%T%z) "Install bower (globally)..." | tee -a $LOGDIR/build.log
sudo npm install -g bower 
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' git|grep "install ok installed")
PKG_VER=$(dpkg-query -s nodejs|grep "Version:")
echo $(date +%FT%T%z) 'Verifying installation of bower: ' $PKG_OK | tee -a $LOGDIR/build.log
if [ "" == "$PKG_OK" ]; then
  echo -e $(date +%FT%T%z) "$COL_RED Installation of bower failed. $COL_RESET" | tee -a $LOGDIR/build.log
  WARNING="TRUE"
else 
  echo $(date +%FT%T%z) "Installation of bower confirmed..." | tee -a $LOGDIR/build.log  
  echo $(date +%FT%T%z) 'bower version installed: ' $PKG_VER | tee -a $LOGDIR/build.log
fi

#############  express installation w/ express-generator
echo $(date +%FT%T%z) "Install express (globally)..." | tee -a $LOGDIR/build.log
sudo npm install -g express 
sudo npm install -g express-generator
PKG_OK=$(express -W --showformat='${Status}\n' express|grep "install ok installed")
PKG1_VER=$(npm -g ls | grep "express@")
PKG2_VER=$(npm -g ls | grep "express-generator")
echo $(date +%FT%T%z) 'Verifying installation of express: ' $PKG_OK | tee -a $LOGDIR/build.log
if [ "" == "$PKG2_VER" ]; then
  echo $(date +%FT%T%z) "Installation of express failed." | tee -a $LOGDIR/build.log
  WARNING="TRUE"
else  
  echo $(date +%FT%T%z) "Installation of express confirmed..." | tee -a $LOGDIR/build.log  
  echo $(date +%FT%T%z) 'express version installed: ' $PKG1_VER | tee -a $LOGDIR/build.log
  echo $(date +%FT%T%z) 'express-generator version installed: ' $PKG2_VER | tee -a $LOGDIR/build.log
fi

############# install node modules
echo $(date +%FT%T%z) 'Installing npm modules: ' $PKG_OK | tee -a $LOGDIR/build.log
sudo npm install

#bower was installed with npm install - it is listed in top package.json
echo $(date +%FT%T%z) '- install bower_components ' | tee -a $LOGDIR/build.log
bower install --allow-root| tee -a $LOGDIR/build.log

############# mongodb install
sudo apt-get --force-yes --yes install mongodb
#echo $(date +%FT%T%z) '- confirm installation mongodb package '| tee -a $LOGDIR/build.log
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' mongodb|grep "install ok installed")
if [ "" == "$PKG_OK" ]; then
  echo $(date +%FT%T%z) "Installation of mongodb failed." | tee -a $LOGDIR/build.log
  WARNING="TRUE"
else
  PKG_INSTALLED=$(dpkg-query -s mongodb | grep Version:)
  echo $(date +%FT%T%z) '"mongodb version installed: ' $PKG_INSTALLED | tee -a $LOGDIR/build.log
  PKG_RUNNING=$(ps aux | grep mongodb)
  if [ "" == "$PKG_RUNNING" ]; then
    echo $(date +%FT%T%z) "mongodb not running..." | tee -a $LOGDIR/build.log
    WARNING="TRUE"
  else
    echo $(date +%FT%T%z) "mongodb running..." | tee -a $LOGDIR/build.log
  fi
fi

################ Launching server - note this uses systemd
cd $WDIR
echo $(date +%FT%T%z) '- enable and start server via systemd ' | tee -a $LOGDIR/build.log
sudo systemctl enable mechMon.service
sudo systemctl start mechMon.service
SERVICE_RUNNING=systemctl status mechMon.service | grep running
if [ "" == "$SERVICE_RUNNING" ]; then
  echo $(date +%FT%T%z) "Service failed to start..." | tee -a $LOGDIR/build.log
  WARNING="TRUE"
fi

if [ "TRUE" == "$WARNING" ]; then
  echo $(date +%FT%T%z) "End of install script. Errors occurred during installation. See log/build.log" | tee -a $LOGDIR/build.log
else
  echo $(date +%FT%T%z) "- install script completed successfully..." | tee -a $LOGDIR/build.log 
fi
  echo $(date +%FT%T%z) "- for npm install log see /usr/local/mechMon/npm-debug.log" | tee -a $LOGDIR/build.log

