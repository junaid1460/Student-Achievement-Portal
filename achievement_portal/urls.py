"""achievement_portal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.conf.urls.static import static, serve
from django.contrib import admin as djangoadmin
from .views import home, log_out, change_pass, make_pdf, admin
from django.contrib.auth.views import login
from student import urls as student_urls
from faculty import urls as faculty_urls
from stats import urls as stats_urls
from stats.views import stats_view
from decorator_include import decorator_include
from django.http import JsonResponse, Http404
from myadmin import urls as admin_urls

def student_required(function):
    def wrapper(request, *args, **kw):
        if request.user.is_authenticated()  or request.user.is_staff:
            if request.user.extended.type != 'S':
                raise Http404
            else:
                return function(request, *args, **kw)
        else:
            raise Http404
    return wrapper

def faculty_required(function):
    def wrapper(request, *args, **kw):
        if request.user.is_authenticated() or request.user.is_staff:
            if request.user.extended.type != 'F' :
                raise Http404
            else:
                return function(request, *args, **kw)
        else:
            raise Http404
    return wrapper

def staff_required(function):
    def wrapper(request, *args, **kw):
        if request.user.is_authenticated():
            if not request.user.is_staff:
                raise Http404
            else:
                return function(request, *args, **kw)
        else:
            raise Http404
    return wrapper

def superuser_required(function):
    def wrapper(request, *args, **kw):
        if request.user.is_authenticated():
            if not request.user.is_superuser:
                raise Http404
            else:
                return function(request, *args, **kw)
        else:
            raise Http404
    return wrapper



urlpatterns = [
    url(r'^admin/', admin),
    url(r'^django-admin/', decorator_include(superuser_required,djangoadmin.site.urls)),
    url(r'^api/admin/', decorator_include(superuser_required,admin_urls )),
    url(r'^$',home),
    url(r'^logout/$', log_out),
    url(r'^api/student/', decorator_include(student_required, include(student_urls))),
    url(r'^stats/', stats_view),
    url(r'^api/faculty/', decorator_include(faculty_required, include(faculty_urls))),
    url(r'^api/stats/', decorator_include(staff_required,include(stats_urls))),
    url(r'^password$',change_pass, name='change password'),

    url(r'^api/student/certificate$',make_pdf, name='Certificate'),
]

from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# ... the rest of your URLconf goes here ...

urlpatterns += staticfiles_urlpatterns()

from init import init
try:
    init()
except BaseException:
    pass
