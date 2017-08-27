#!/bin/bash

# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn achievement_portal.wsgi:application \
    --bind 0:80 \
    --workers 3

# [Unit]
# Description = making network connection up
# After = network.target
# [Service]
# Type=oneshot
# WorkingDirectory=/home/junaid/code/django/achievement_portal
# ExecStart = /home/junaid/code/django/achievement_portal/run.sh
# [Install]
# WantedBy = multi-user.target