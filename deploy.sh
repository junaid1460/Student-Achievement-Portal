#!/bin/bash

if [ "$(whoami)" != "root" ]
then
    echo "Only root can run this file."
    echo "run : sudo $0"
    exit
fi

cd "$(dirname $0)"
export PUSER="portal"
sudo groupadd docker
sudo useradd $PUSER -g docker -s "$(which nologin)"

createService () {
    file=$1
    export PFILE="$file"
    envsubst < service.template
}
echo "Generating service files"
systemd="/etc/systemd/system"
ach="ach"
createService "runserver.sh"  > "$systemd/$ach.service"
static="static"
createService "runstatic.sh" > "$systemd/$static.service"

echo "Building app for localsystem"
./build.sh

echo "Enabling services"
systemctl enable "$ach"
systemctl enable "$static"

startOrRestart () {
    echo Service:$1
    service "$1" restart
}

echo "killing all containers"
./dkill.sh

echo "Running services"
startOrRestart "$ach" &
startOrRestart "$static" &
