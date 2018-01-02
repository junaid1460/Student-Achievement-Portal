#!/bin/bash

./gen.sh
python3.5 manage.py collectstatic --noinput
sudo docker-compose build web
sudo docker-compose up web &
./runstatic.sh &