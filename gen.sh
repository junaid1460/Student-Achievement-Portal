#!/bin/bash

source "./env.sh"
envsubst < ./template.yml > docker-compose.yml