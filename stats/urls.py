from django.conf.urls import url
from .views import stats_view, StatsListing, StudentStatsListing
urlpatterns = [
  url(r'^$', stats_view),
  url(r'^search$', StatsListing.as_view()),
  url(r'^searchstudent$', StudentStatsListing.as_view()),
]