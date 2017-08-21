from django.conf.urls import url
from .views import DocumentListView,delete, DocumentSetView
urlpatterns = [
  url(r'^docs$', DocumentListView.as_view()),
  url(r'^docs/upload$', DocumentSetView.as_view()),
  url(r'^docs/delete$', delete)
]