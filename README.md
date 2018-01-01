# Student Achievement Portal

A web portal for uploading and verifying students' achievement documents. The software allows college to collect students' academic and other data for statistical analysis. It helps college in analysing growth of students. Once the students' documents gets verified students are able to generate consolidated report regarding their achievements, which is used for placement purposes. The system preserves all data and makes it available for students' at any time, it covers the issue of losing certificates.

# Language 
 - `Python` 
 - `TypeScript` (Javascript superset)

# frameworks
 - `Django`
 - `DjangoRestFramework`
 - `Angular`

# deployment
 - Nginx
 - gunicorn (Django)
 - py2 SimpleHTTPServer (static files)

# How to deploy for different departments?
Do not worry. we can run multiple instances of app in a VM for different departments and add route in nginx for a specific department. `ip/[dept name]`


# License

GNU GPLv3