from django.conf.urls import url
from .views import addUsers, deleteUsers, getUserJson
urlpatterns = [
    url(r'^addusers$', addUsers),
    url(r'^addusers$', deleteUsers),
    url(r'^getjson$', getUserJson),
]