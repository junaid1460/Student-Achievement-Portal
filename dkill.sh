sudo docker ps|cut -d' ' -f1|tail -n +2|xargs -L1 sudo docker kill
