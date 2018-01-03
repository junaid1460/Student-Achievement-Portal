#!/bin/bash
elms="$(docker ps|cut -d' ' -f1|tail -n +2)"
if [ "$elms" != "" ]
then
    echo $elms|xargs -L1 docker kill
fi