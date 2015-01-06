#!/bin/bash
#Brian E. Moore, PE mods
#Date: December 24, 2014
#expects parameter - port, i.e. sudo ./startup.sh 3000
WDIR=/usr/local/mechMon
#MONGO_DIR='/cygdrive/c/MongoDB/MongoDB2.6Standard/bin'
MONGO_DIR='C:/Users/Brian/Documents/node_modules/mongodb'
MONGO='mongod.exe'

#sudo ln -sf /usr/share/zoneinfo/America/Indianapolis /etc/localtime
TIMESTAMP=$(date +%FT%T%z)

APPLOG=$WDIR'/log'

echo " " >> $APPLOG/app.log
echo "==========================" >> $APPLOG/app.log
echo "app.log" >> $APPLOG/app.log
date >> $APPLOG/app.log

cd $WDIR
echo " " | tee -a $APPLOG/app.log 

echo $(date +%FT%T%z) 
echo $(date) "- start startup.sh ..." | tee -a $APPLOG/app.log 
echo $(date) '- launching the server tech stack' | tee -a $APPLOG/app.log
#get ip addresses and mask of first two network cards
IP_ADDR0=$(ifconfig eth0 | grep 'inet addr'| cut -d':' -f2| cut -d' ' -f1)
MASK0=$(ifconfig eth0 | grep 'inet addr'| cut -d':' -f4)
IP_ADDR1=$(ifconfig usb0 | grep 'inet addr'| cut -d':' -f2| cut -d' ' -f1)
MASK1=$(ifconfig usb0 | grep 'inet addr'| cut -d':' -f4)
export IP_ADDR0; export IP_ADDR1; export MASK0; export MASK1
echo $(date +%FT%T%z) 'IP_ADDR0: ' $IP_ADDR0 ' MASK0: ' $MASK0  | tee -a $LOGDIR/build.log
echo $(date +%FT%T%z) 'IP_ADDR1: ' $IP_ADDR1 ' MASK1: ' $MASK1| tee -a $LOGDIR/build.log


#echo $(date) "- launching $MONGO " | tee -a $APPLOG/app.log

echo $(date) "- database start temporarily disabled by BEM " | tee -a $APPLOG/app.log

# $MONGO_DIR/$MONGO >> $APPLOG/app.log  2>&1 &
# echo $! > $WDIR/mongo.pid
# sudo service mongod restart  >> $APPLOG/app.log 2>&1 &
# echo $! > $WDIR/mongo.pid

cd $WDIR
  echo $(date) '- launching tech stack server with node.js on port '$1 | tee -a $APPLOG/app.log
  node ./server.js "$1" >> $APPLOG/app.log 2>&1 &
  echo $! > $WDIR/node.pid 
STAT=$( ps aux | grep 'node server.js ')
if [ "" == "$STAT" ]; then
  echo $(date) "- tech stack server app not launched..."
  echo "  to launch app execute script as  '$ ./startup.sh <port>'"
else
  echo $(date) "-  app tech stack server running..."
  exit 0
fi
echo $(date) "- end of startup.sh ..." | tee -a $APPLOG/app.log
