#!/bin/bash

./gen.sh
python3.5 -m pip install -r requirements.txt
python3.5 manage.py collectstatic --noinput
docker-compose build web