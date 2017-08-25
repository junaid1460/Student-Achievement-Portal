from django.conf.urls import url
from .views import stats_view, StatsListing, StudentStatsListing, StudentView, CurrentStudentList
from .views import PDFview
urlpatterns = [
  url(r'^$', stats_view),
  url(r'^search$', StatsListing.as_view()),
  url(r'^searchstudent$', StudentStatsListing.as_view()),
  url(r'^getstudent$', StudentView.as_view()),
  url(r'^currentstudent$', CurrentStudentList.as_view()),
  url(r'^getpdf$', PDFview.as_view()),
]