#!/bin/bash

./gen.sh
sudo docker-compose build web
sudo docker-compose up web