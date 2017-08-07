from django.conf.urls import url
from .views import stats_view
urlpatterns = [
  url(r'^$', stats_view),

]