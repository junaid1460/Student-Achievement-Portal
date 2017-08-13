from django.conf.urls import url
from .views import stats_view, StatsListing
urlpatterns = [
  url(r'^$', stats_view),
  url(r'^search$', StatsListing.as_view()),
]