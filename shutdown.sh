#!/bin/bash
#Brian E. Moore, PE
#Date: December 24, 2014
WDIR=/usr/local/mechMon
#MONGO_DIR='/cygdrive/c/MongoDB/MongoDB2.6Standard/bin'
MONGO_DIR='C:/Users/Brian/Documents/node_modules/mongodb'
MONGO='mongod.exe'
DATE=$(date +"%Y%m%d")
TIME=$(date +"%H%M%S")
APPLOG=$WDIR'/log'

cd $WDIR
echo " " | tee -a $APPLOG/app.log 
echo $(date) "- running shutdown.sh ..." | tee -a $APPLOG/app.log 
echo $(date) '- shutting down the tech stack' | tee -a $APPLOG/app.log

cd $WDIR
if [ -f node.pid ]
then
  node_pid="`cat node.pid`"
  echo $(date) '- shutting down tech stack with node.js' | tee -a $APPLOG/app.log
  kill $node_pid
  rm $WDIR/node.pid
fi

echo $(date) "- end of shutdown.sh ..." | tee -a $APPLOG/app.log 
