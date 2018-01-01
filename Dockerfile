FROM python:3.5-onbuild

EXPOSE 5000

CMD gunicorn achievement_portal.wsgi:application --bind 0:8000
