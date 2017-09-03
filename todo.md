On what should I work next?

 - adding link to /admin in /django-admin
 - on logout goto / from /django-admin
 - implement deleteUsers in /admin
 - implement UI for deleteUsers in /admin
 - optional implementation of adding staff in /admin

 # todo in the VM
 I prefer serving static content with python2 simple http server and service with gunicorn
        nginx
          /\
         /  \
        /    \
    /static  /api,/
     /         \
    /           \
SHTTPS:8001   gunicorn:8000
this setup is nice.

for both services 
SHTTPS: systemd damon
gunicorn: systemd daemon